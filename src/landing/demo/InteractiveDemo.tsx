import { useMemo, useState } from 'react'
import {
  durationOptions,
  interestOptions,
  plannerCatalog,
  serviceTypeOptions,
  supplierOffers,
  type TravelType,
} from '../data/demoData'

type DemoStep = 1 | 2 | 3 | 4 | 5

const travelTypes: TravelType[] = ['Budget', 'Mid', 'Luxury']

function formatPrice(value: number) {
  return new Intl.NumberFormat('en-MY', {
    style: 'currency',
    currency: 'MYR',
    maximumFractionDigits: 0,
  }).format(value)
}

export function InteractiveDemo() {
  const [step, setStep] = useState<DemoStep>(1)
  const [budget, setBudget] = useState(4500)
  const [travelType, setTravelType] = useState<TravelType>('Mid')
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Adventure'])
  const [durationDays, setDurationDays] = useState(5)
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([])
  const [selectedServiceTypes, setSelectedServiceTypes] = useState<string[]>(['Activity Operator'])
  const [customRequest, setCustomRequest] = useState('')
  const [requestSubmitted, setRequestSubmitted] = useState(false)
  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null)

  const selectedItems = useMemo(
    () => plannerCatalog.filter((item) => selectedItemIds.includes(item.id)),
    [selectedItemIds],
  )

  const estimatedTotal = useMemo(
    () => selectedItems.reduce((sum, item) => sum + item.cost, 0),
    [selectedItems],
  )

  const totalHours = useMemo(
    () => selectedItems.reduce((sum, item) => sum + item.durationHours, 0),
    [selectedItems],
  )

  const requestBase = estimatedTotal > 0 ? estimatedTotal : Math.round(budget * 0.35)

  const resolvedOffers = useMemo(
    () =>
      supplierOffers.map((offer) => {
        const adjusted = Math.round(requestBase * (1 + offer.adjustmentPercent / 100))
        return {
          ...offer,
          total: adjusted,
        }
      }),
    [requestBase],
  )

  const selectedOffer = resolvedOffers.find((offer) => offer.id === selectedOfferId)
  const hasRequestInput =
    selectedItems.length > 0 ||
    selectedServiceTypes.length > 0 ||
    customRequest.trim().length > 0

  const stepTitles: Record<DemoStep, string> = {
    1: 'Step 1: Plan',
    2: 'Step 2: Choose What To Do',
    3: 'Step 3: Request Services',
    4: 'Step 4: Provider Offers',
    5: 'Step 5: Final Trip Result',
  }

  const toggleInterest = (interest: string) => {
    setSelectedInterests((current) =>
      current.includes(interest)
        ? current.filter((item) => item !== interest)
        : [...current, interest],
    )
  }

  const toggleItem = (id: string) => {
    setRequestSubmitted(false)
    setSelectedItemIds((current) =>
      current.includes(id)
        ? current.filter((itemId) => itemId !== id)
        : [...current, id],
    )
  }

  const toggleServiceType = (serviceTypeLabel: string) => {
    setRequestSubmitted(false)
    setSelectedServiceTypes((current) =>
      current.includes(serviceTypeLabel)
        ? current.filter((item) => item !== serviceTypeLabel)
        : [...current, serviceTypeLabel],
    )
  }

  const nextStep = () =>
    setStep((prev) => (prev === 5 ? 5 : ((prev + 1) as DemoStep)))

  const previousStep = () =>
    setStep((prev) => (prev === 1 ? 1 : ((prev - 1) as DemoStep)))

  const submitRequest = () => {
    if (!hasRequestInput) {
      return
    }

    setRequestSubmitted(true)
    setStep(4)
  }

  const continueDisabled = step === 5 || (step === 3 && !requestSubmitted)

  return (
    <div className="rounded-lg border border-[#067bc2]/20 bg-white p-4 shadow-lg shadow-[#067bc2]/15 backdrop-blur sm:rounded-xl sm:p-6 md:rounded-2xl md:p-8">
      <div className="mb-3 flex flex-col gap-3 sm:mb-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 md:mb-5">
        <h3 className="text-lg font-bold text-[#055f95] sm:text-xl md:text-2xl">{stepTitles[step]}</h3>
        <div className="flex items-center gap-1.5 sm:gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <span
              key={n}
              className={`flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold transition sm:h-8 sm:w-8 sm:text-sm ${
                n <= step
                  ? 'border-orange-500 bg-orange-500 text-white'
                  : 'border-[#067bc2]/25 bg-white text-[#067bc2]/55'
              }`}
            >
              {n}
            </span>
          ))}
        </div>
      </div>

      <div key={step} className="tripu-step-enter">
      {step === 1 && (
        <div className="space-y-4 sm:space-y-5 md:space-y-6">
          <label className="block">
            <span className="mb-2 block text-xs font-medium text-[#067bc2] sm:text-sm">Budget: {formatPrice(budget)}</span>
            <input
              type="range"
              min={1500}
              max={12000}
              step={100}
              value={budget}
              onChange={(event) => setBudget(Number(event.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-[#067bc2]/20"
            />
          </label>

          <div>
            <p className="mb-2 text-xs font-medium text-[#067bc2] sm:text-sm">Trip Style</p>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {travelTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setTravelType(type)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition hover:scale-[1.02] sm:rounded-xl sm:px-4 sm:py-2 sm:text-sm ${
                    travelType === type
                      ? 'bg-orange-500 text-white'
                      : 'border border-[#067bc2]/25 bg-white text-[#067bc2] hover:bg-[#067bc2]/10'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-medium text-[#067bc2] sm:text-sm">Preferences</p>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {interestOptions.map((interest) => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  className={`rounded-lg border px-2.5 py-1.5 text-xs transition sm:rounded-xl sm:px-3 sm:py-2 sm:text-sm ${
                    selectedInterests.includes(interest)
                      ? 'border-orange-500 bg-orange-500/10 text-orange-500'
                      : 'border-[#067bc2]/25 bg-white text-[#067bc2] hover:border-[#067bc2]/45'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-medium text-[#067bc2] sm:text-sm">Trip Duration</p>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {durationOptions.map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => setDurationDays(day)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition sm:rounded-xl sm:px-4 sm:py-2 sm:text-sm ${
                    durationDays === day
                      ? 'bg-orange-500 text-white'
                      : 'border border-[#067bc2]/25 bg-white text-[#067bc2] hover:bg-[#067bc2]/10'
                  }`}
                >
                  {day}d
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-3 sm:space-y-4">
          <p className="text-xs text-[#067bc2]/80 sm:text-sm">
            Suggested ideas below are requestable experiences, not direct bookings.
          </p>
          <div className="grid gap-2 sm:gap-3 md:gap-3 md:grid-cols-2 xl:grid-cols-4">
            {serviceTypeOptions.map((serviceType) => {
              const selected = selectedServiceTypes.includes(serviceType.label)
              return (
                <button
                  key={serviceType.id}
                  type="button"
                  onClick={() => toggleServiceType(serviceType.label)}
                  className={`rounded-lg border p-3 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#067bc2]/15 sm:rounded-xl sm:p-4 md:rounded-2xl ${
                    selected
                      ? 'border-orange-500 bg-orange-500/10'
                      : 'border-[#067bc2]/20 bg-white'
                  }`}
                >
                  <p className="text-xs font-semibold text-[#055f95] sm:text-sm">
                    <span className="mr-2 inline-block animate-[float_3s_ease-in-out_infinite]">{serviceType.icon}</span>
                    {serviceType.label}
                  </p>
                  <p className="mt-1 text-[0.65rem] text-[#067bc2]/80 sm:text-xs">{serviceType.detail}</p>
                </button>
              )
            })}
          </div>
          <div className="grid gap-2 sm:gap-3 md:gap-4 md:grid-cols-2 xl:grid-cols-3">
            {plannerCatalog.map((item) => {
              const selected = selectedItemIds.includes(item.id)
              return (
                <article
                  key={item.id}
                  className="overflow-hidden rounded-lg border border-[#067bc2]/25 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/20 sm:rounded-xl md:rounded-2xl"
                >
                  <img src={item.image} alt={item.name} className="h-28 w-full object-cover sm:h-32 md:h-36" />
                  <div className="space-y-1.5 p-3 sm:space-y-2 sm:p-4">
                    <p className="text-[0.65rem] uppercase tracking-wide text-orange-500 sm:text-xs">{item.location}</p>
                    <h4 className="text-sm font-semibold text-[#055f95] sm:text-base md:text-lg">{item.name}</h4>
                    <p className="text-xs text-[#067bc2]/80 sm:text-sm">{item.description}</p>
                    <div className="flex items-center justify-between text-xs text-[#067bc2]/80 sm:text-sm">
                      <span>{item.category}</span>
                      <span>{formatPrice(item.cost)}</span>
                    </div>
                    <p className="inline-flex rounded-full border border-[#067bc2]/20 bg-[#067bc2]/5 px-2 py-0.5 text-[0.6rem] font-semibold text-[#067bc2] sm:text-xs">
                      {item.providerServiceType}
                    </p>
                    <button
                      type="button"
                      onClick={() => toggleItem(item.id)}
                      className={`w-full rounded-lg px-2 py-1.5 text-xs font-semibold transition-all duration-300 active:scale-[0.98] sm:rounded-lg sm:px-3 sm:py-2 sm:text-sm ${
                        selected
                          ? 'bg-[#067bc2] text-white'
                          : 'bg-orange-500 text-white hover:scale-[1.02]'
                      }`}
                    >
                      {selected ? 'Remove' : 'Add'}
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-3 sm:space-y-4">
          <div className="rounded-lg border border-[#067bc2]/20 bg-white p-3 sm:rounded-xl sm:p-4">
            <h4 className="mb-2 text-sm font-semibold text-[#055f95] sm:text-base md:text-lg">Your Requested Activities</h4>
            {selectedItems.length === 0 ? (
              <p className="text-xs text-[#067bc2]/75 sm:text-sm">No activity ideas selected yet. You can still submit a custom request.</p>
            ) : (
              <ul className="space-y-1.5 text-xs text-[#067bc2] sm:space-y-2 sm:text-sm">
                {selectedItems.map((item) => (
                  <li key={item.id} className="rounded-lg border border-[#067bc2]/20 bg-white px-2.5 py-1.5 sm:px-3 sm:py-2">
                    {item.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="rounded-lg border border-[#067bc2]/20 bg-white p-3 sm:rounded-xl sm:p-4">
            <p className="mb-2 text-xs font-medium text-[#067bc2] sm:text-sm">Requested Service Types</p>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {serviceTypeOptions.map((serviceType) => {
                const selected = selectedServiceTypes.includes(serviceType.label)
                return (
                  <button
                    key={serviceType.id}
                    type="button"
                    onClick={() => toggleServiceType(serviceType.label)}
                    className={`rounded-full border px-2 py-0.5 text-[0.65rem] font-semibold transition-all duration-300 active:scale-[0.98] sm:px-3 sm:py-1 sm:text-xs ${
                      selected
                        ? 'border-orange-500 bg-orange-500/10 text-orange-500'
                        : 'border-[#067bc2]/25 bg-white text-[#067bc2] hover:border-[#067bc2]/45'
                    }`}
                  >
                    {serviceType.icon} {serviceType.label}
                  </button>
                )
              })}
            </div>
          </div>

          <label className="block">
            <span className="mb-2 block text-xs font-medium text-[#067bc2] sm:text-sm">Custom Request (optional)</span>
            <textarea
              value={customRequest}
              onChange={(event) => {
                setRequestSubmitted(false)
                setCustomRequest(event.target.value)
              }}
              className="min-h-20 w-full rounded-lg border border-[#067bc2]/20 px-3 py-2 text-xs text-[#067bc2] outline-none ring-orange-500 ring-offset-2 placeholder:text-[#067bc2]/45 focus:ring-2 sm:min-h-24 sm:px-4 sm:py-3 sm:text-sm"
              placeholder="Example: Water adventure in Tioman Island"
            />
          </label>

          <button
            type="button"
            onClick={submitRequest}
            disabled={!hasRequestInput}
            className="rounded-lg bg-orange-500 px-4 py-2 text-xs font-semibold text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 sm:rounded-xl sm:px-6 sm:py-3 sm:text-sm"
          >
            Send Request To Providers
          </button>
          {requestSubmitted && (
            <p className="text-xs text-orange-500 sm:text-sm">Request sent. Provider offers are now available.</p>
          )}
        </div>
      )}

      {step === 4 && (
        <div className="space-y-2.5 sm:space-y-3">
          {resolvedOffers.map((offer) => {
            const selected = offer.id === selectedOfferId
            return (
              <article
                key={offer.id}
                className={`rounded-lg border p-3 transition sm:rounded-xl sm:p-4 ${
                  selected
                    ? 'border-orange-500 bg-orange-500/10'
                    : 'border-[#067bc2]/20 bg-white hover:border-[#067bc2]/45'
                }`}
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                  <div>
                    <h4 className="text-sm font-semibold text-[#055f95] sm:text-base md:text-lg">{offer.supplier}</h4>
                    <p className="text-[0.65rem] uppercase tracking-wide text-[#067bc2]/70 sm:text-xs">{offer.providerType}</p>
                  </div>
                  <p className="text-lg font-bold text-orange-500 sm:text-xl">{formatPrice(offer.total)}</p>
                </div>
                <p className="mt-2 text-xs text-[#067bc2]/80 sm:text-sm">{offer.perks}</p>
                <p className="mt-1.5 text-[0.65rem] uppercase tracking-wide text-[#067bc2]/70 sm:mt-2 sm:text-xs">
                  {offer.adjustmentPercent}% vs your request estimate
                </p>
                <button
                  type="button"
                  onClick={() => setSelectedOfferId(offer.id)}
                  className="mt-2 rounded-lg bg-[#067bc2] px-3 py-1.5 text-xs font-semibold text-white transition-all duration-300 hover:brightness-110 active:scale-[0.98] sm:mt-3 sm:px-4 sm:py-2 sm:text-sm"
                >
                  {selected ? 'Selected' : 'Choose Offer'}
                </button>
              </article>
            )
          })}
        </div>
      )}

      {step === 5 && (
        <div className="space-y-3 sm:space-y-4">
          <div className="rounded-lg border border-[#067bc2]/20 bg-white p-3 sm:rounded-xl sm:p-4">
            <h4 className="text-sm font-semibold text-[#055f95] sm:text-base md:text-lg">Trip Roadmap</h4>
            <ol className="mt-2 space-y-1 text-xs text-[#067bc2] sm:mt-3 sm:space-y-2 sm:text-sm">
              {selectedItems.length === 0 && !customRequest.trim() ? (
                <li className="rounded-lg border border-[#067bc2]/20 bg-white px-2.5 py-1.5 sm:px-3 sm:py-2">
                  No request details were added. Start from Step 2 or Step 3 to build a roadmap.
                </li>
              ) : (
                <>
                  {selectedItems.map((item, index) => (
                    <li key={item.id} className="rounded-lg border border-[#067bc2]/20 bg-white px-2.5 py-1.5 sm:px-3 sm:py-2">
                      Day {Math.min(durationDays, index + 1)}: {item.name} ({item.durationHours}h)
                    </li>
                  ))}
                  {customRequest.trim() && (
                    <li className="rounded-lg border border-[#067bc2]/20 bg-white px-2.5 py-1.5 sm:px-3 sm:py-2">
                      Custom request: {customRequest.trim()}
                    </li>
                  )}
                  {selectedServiceTypes.length > 0 && (
                    <li className="rounded-lg border border-[#067bc2]/20 bg-white px-2.5 py-1.5 sm:px-3 sm:py-2">
                      Requested service types: {selectedServiceTypes.join(', ')}
                    </li>
                  )}
                </>
              )}
            </ol>
          </div>

          <div className="grid gap-2 sm:gap-3 md:gap-3 md:grid-cols-3">
            <div className="rounded-lg border border-[#067bc2]/20 bg-[#067bc2]/5 p-3 sm:rounded-xl sm:p-4">
              <p className="text-xs uppercase tracking-wide text-[#067bc2]/70">Estimated Cost</p>
              <p className="mt-1.5 text-base font-bold text-[#067bc2] sm:mt-2 sm:text-lg md:text-xl">
                {selectedOffer ? formatPrice(selectedOffer.total) : formatPrice(requestBase)}
              </p>
            </div>
            <div className="rounded-lg border border-[#067bc2]/20 bg-[#067bc2]/5 p-3 sm:rounded-xl sm:p-4">
              <p className="text-xs uppercase tracking-wide text-[#067bc2]/70">Selected Services</p>
              <p className="mt-1.5 text-xs font-semibold text-[#067bc2] sm:mt-2 sm:text-sm">
                {selectedOffer
                  ? `${selectedOffer.providerType} via ${selectedOffer.supplier}`
                  : selectedServiceTypes.length > 0
                    ? selectedServiceTypes.join(', ')
                    : 'Pending provider selection'}
              </p>
            </div>
            <div className="rounded-lg border border-[#067bc2]/20 bg-[#067bc2]/5 p-3 sm:rounded-xl sm:p-4">
              <p className="text-xs uppercase tracking-wide text-[#067bc2]/70">Trip Plan</p>
              <p className="mt-1.5 text-base font-bold text-orange-500 sm:mt-2 sm:text-lg md:text-xl">{durationDays} Days</p>
              <p className="mt-0.5 text-xs text-[#067bc2]/75 sm:text-sm">{totalHours} activity hours</p>
            </div>
          </div>
        </div>
      )}
      </div>

      <div className="mt-4 flex flex-col gap-2 border-t border-[#067bc2]/20 pt-3 sm:mt-5 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:pt-4 md:mt-6">
        <button
          type="button"
          onClick={previousStep}
          disabled={step === 1}
          className="rounded-lg border border-[#067bc2]/25 bg-white px-3 py-1.5 text-xs font-semibold text-[#067bc2] transition-all duration-300 hover:bg-[#067bc2]/10 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 sm:rounded-xl sm:px-4 sm:py-2 sm:text-sm"
        >
          Back
        </button>
        <button
          type="button"
          onClick={nextStep}
          disabled={continueDisabled}
          className="rounded-lg bg-orange-500 px-3 py-1.5 text-xs font-semibold text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 sm:rounded-xl sm:px-4 sm:py-2 sm:text-sm"
        >
          Continue
        </button>
      </div>
    </div>
  )
}
