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
    <div className="rounded-2xl border border-[#067bc2]/20 bg-white p-6 shadow-lg shadow-[#067bc2]/15 backdrop-blur md:p-8">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-xl font-bold text-[#055f95] md:text-2xl">{stepTitles[step]}</h3>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <span
              key={n}
              className={`flex h-8 w-8 items-center justify-center rounded-full border text-sm font-semibold transition ${
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
        <div className="space-y-6">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-[#067bc2]">Budget: {formatPrice(budget)}</span>
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
            <p className="mb-2 text-sm font-medium text-[#067bc2]">Trip Style</p>
            <div className="flex flex-wrap gap-2">
              {travelTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setTravelType(type)}
                  className={`rounded-xl px-4 py-2 text-sm font-semibold transition hover:scale-[1.02] ${
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
            <p className="mb-2 text-sm font-medium text-[#067bc2]">Preferences</p>
            <div className="flex flex-wrap gap-2">
              {interestOptions.map((interest) => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  className={`rounded-xl border px-3 py-2 text-sm transition ${
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
            <p className="mb-2 text-sm font-medium text-[#067bc2]">Trip Duration</p>
            <div className="flex flex-wrap gap-2">
              {durationOptions.map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => setDurationDays(day)}
                  className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                    durationDays === day
                      ? 'bg-orange-500 text-white'
                      : 'border border-[#067bc2]/25 bg-white text-[#067bc2] hover:bg-[#067bc2]/10'
                  }`}
                >
                  {day} days
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <p className="text-sm text-[#067bc2]/80">
            Suggested ideas below are requestable experiences, not direct bookings.
          </p>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {serviceTypeOptions.map((serviceType) => {
              const selected = selectedServiceTypes.includes(serviceType.label)
              return (
                <button
                  key={serviceType.id}
                  type="button"
                  onClick={() => toggleServiceType(serviceType.label)}
                  className={`rounded-2xl border p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#067bc2]/15 ${
                    selected
                      ? 'border-orange-500 bg-orange-500/10'
                      : 'border-[#067bc2]/20 bg-white'
                  }`}
                >
                  <p className="text-sm font-semibold text-[#055f95]">
                    <span className="mr-2 inline-block animate-[float_3s_ease-in-out_infinite]">{serviceType.icon}</span>
                    {serviceType.label}
                  </p>
                  <p className="mt-1 text-xs text-[#067bc2]/80">{serviceType.detail}</p>
                </button>
              )
            })}
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {plannerCatalog.map((item) => {
              const selected = selectedItemIds.includes(item.id)
              return (
                <article
                  key={item.id}
                  className="overflow-hidden rounded-2xl border border-[#067bc2]/25 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/20"
                >
                  <img src={item.image} alt={item.name} className="h-36 w-full object-cover" />
                  <div className="space-y-2 p-4">
                    <p className="text-xs uppercase tracking-wide text-orange-500">{item.location}</p>
                    <h4 className="text-lg font-semibold text-[#055f95]">{item.name}</h4>
                    <p className="text-sm text-[#067bc2]/80">{item.description}</p>
                    <div className="flex items-center justify-between text-sm text-[#067bc2]/80">
                      <span>{item.category}</span>
                      <span>{formatPrice(item.cost)}</span>
                    </div>
                    <p className="inline-flex rounded-full border border-[#067bc2]/20 bg-[#067bc2]/5 px-2 py-1 text-xs font-semibold text-[#067bc2]">
                      {item.providerServiceType}
                    </p>
                    <button
                      type="button"
                      onClick={() => toggleItem(item.id)}
                      className={`w-full rounded-xl px-3 py-2 text-sm font-semibold transition-all duration-300 active:scale-[0.98] ${
                        selected
                          ? 'bg-[#067bc2] text-white'
                          : 'bg-orange-500 text-white hover:scale-[1.02]'
                      }`}
                    >
                      {selected ? 'Remove from Request' : 'Add to Request'}
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <div className="rounded-xl border border-[#067bc2]/20 bg-white p-4">
            <h4 className="mb-2 text-lg font-semibold text-[#055f95]">Your Requested Activities</h4>
            {selectedItems.length === 0 ? (
              <p className="text-sm text-[#067bc2]/75">No activity ideas selected yet. You can still submit a custom request.</p>
            ) : (
              <ul className="space-y-2 text-sm text-[#067bc2]">
                {selectedItems.map((item) => (
                  <li key={item.id} className="rounded-lg border border-[#067bc2]/20 bg-white px-3 py-2">
                    {item.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="rounded-xl border border-[#067bc2]/20 bg-white p-4">
            <p className="mb-2 text-sm font-medium text-[#067bc2]">Requested Service Types</p>
            <div className="flex flex-wrap gap-2">
              {serviceTypeOptions.map((serviceType) => {
                const selected = selectedServiceTypes.includes(serviceType.label)
                return (
                  <button
                    key={serviceType.id}
                    type="button"
                    onClick={() => toggleServiceType(serviceType.label)}
                    className={`rounded-full border px-3 py-1 text-xs font-semibold transition-all duration-300 active:scale-[0.98] ${
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
            <span className="mb-2 block text-sm font-medium text-[#067bc2]">Custom Request (optional)</span>
            <textarea
              value={customRequest}
              onChange={(event) => {
                setRequestSubmitted(false)
                setCustomRequest(event.target.value)
              }}
              className="min-h-24 w-full rounded-lg border border-[#067bc2]/20 px-4 py-3 text-[#067bc2] outline-none ring-orange-500 ring-offset-2 placeholder:text-[#067bc2]/45 focus:ring-2"
              placeholder="Example: Water adventure in Tioman Island"
            />
          </label>

          <button
            type="button"
            onClick={submitRequest}
            disabled={!hasRequestInput}
            className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Send Request To Providers
          </button>
          {requestSubmitted && (
            <p className="text-sm text-orange-500">Request sent. Provider offers are now available.</p>
          )}
        </div>
      )}

      {step === 4 && (
        <div className="space-y-4">
          {resolvedOffers.map((offer) => {
            const selected = offer.id === selectedOfferId
            return (
              <article
                key={offer.id}
                className={`rounded-xl border p-4 transition ${
                  selected
                    ? 'border-orange-500 bg-orange-500/10'
                    : 'border-[#067bc2]/20 bg-white hover:border-[#067bc2]/45'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h4 className="text-lg font-semibold text-[#055f95]">{offer.supplier}</h4>
                    <p className="text-xs uppercase tracking-wide text-[#067bc2]/70">{offer.providerType}</p>
                  </div>
                  <p className="text-xl font-bold text-orange-500">{formatPrice(offer.total)}</p>
                </div>
                <p className="mt-2 text-sm text-[#067bc2]/80">{offer.perks}</p>
                <p className="mt-2 text-xs uppercase tracking-wide text-[#067bc2]/70">
                  {offer.adjustmentPercent}% vs your request estimate
                </p>
                <button
                  type="button"
                  onClick={() => setSelectedOfferId(offer.id)}
                  className="mt-3 rounded-lg bg-[#067bc2] px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:brightness-110 active:scale-[0.98]"
                >
                  {selected ? 'Selected' : 'Choose Offer'}
                </button>
              </article>
            )
          })}
        </div>
      )}

      {step === 5 && (
        <div className="space-y-4">
          <div className="rounded-xl border border-[#067bc2]/20 bg-white p-4">
            <h4 className="text-lg font-semibold text-[#055f95]">Trip Roadmap</h4>
            <ol className="mt-3 space-y-2 text-sm text-[#067bc2]">
              {selectedItems.length === 0 && !customRequest.trim() ? (
                <li className="rounded-lg border border-[#067bc2]/20 bg-white px-3 py-2">
                  No request details were added. Start from Step 2 or Step 3 to build a roadmap.
                </li>
              ) : (
                <>
                  {selectedItems.map((item, index) => (
                    <li key={item.id} className="rounded-lg border border-[#067bc2]/20 bg-white px-3 py-2">
                      Day {Math.min(durationDays, index + 1)}: {item.name} ({item.durationHours}h)
                    </li>
                  ))}
                  {customRequest.trim() && (
                    <li className="rounded-lg border border-[#067bc2]/20 bg-white px-3 py-2">
                      Custom request: {customRequest.trim()}
                    </li>
                  )}
                  {selectedServiceTypes.length > 0 && (
                    <li className="rounded-lg border border-[#067bc2]/20 bg-white px-3 py-2">
                      Requested service types: {selectedServiceTypes.join(', ')}
                    </li>
                  )}
                </>
              )}
            </ol>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-xl border border-[#067bc2]/20 bg-[#067bc2]/5 p-4">
              <p className="text-xs uppercase tracking-wide text-[#067bc2]/70">Estimated Cost</p>
              <p className="mt-2 text-xl font-bold text-[#067bc2]">
                {selectedOffer ? formatPrice(selectedOffer.total) : formatPrice(requestBase)}
              </p>
            </div>
            <div className="rounded-xl border border-[#067bc2]/20 bg-[#067bc2]/5 p-4">
              <p className="text-xs uppercase tracking-wide text-[#067bc2]/70">Selected Services</p>
              <p className="mt-2 text-sm font-semibold text-[#067bc2]">
                {selectedOffer
                  ? `${selectedOffer.providerType} via ${selectedOffer.supplier}`
                  : selectedServiceTypes.length > 0
                    ? selectedServiceTypes.join(', ')
                    : 'Pending provider selection'}
              </p>
            </div>
            <div className="rounded-xl border border-[#067bc2]/20 bg-[#067bc2]/5 p-4">
              <p className="text-xs uppercase tracking-wide text-[#067bc2]/70">Trip Plan</p>
              <p className="mt-2 text-xl font-bold text-orange-500">{durationDays} Days</p>
              <p className="mt-1 text-sm text-[#067bc2]/75">{totalHours} planned activity hours</p>
            </div>
          </div>
        </div>
      )}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#067bc2]/20 pt-4">
        <button
          type="button"
          onClick={previousStep}
          disabled={step === 1}
          className="rounded-xl border border-[#067bc2]/25 bg-white px-4 py-2 text-sm font-semibold text-[#067bc2] transition-all duration-300 hover:bg-[#067bc2]/10 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Back
        </button>
        <button
          type="button"
          onClick={nextStep}
          disabled={continueDisabled}
          className="rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Continue
        </button>
      </div>
    </div>
  )
}
