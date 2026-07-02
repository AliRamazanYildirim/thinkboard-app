import { LockIcon } from 'lucide-react'

const SubscriptionRestrictedBanner = ({ status, daysOverdue }) => {
  const isSuspended = status === 'suspended';

  const colorClasses = isSuspended
    ? "bg-red-500/10 border border-red-500/30"
    : "bg-orange-500/10 border border-orange-500/30";

  const iconColorClass = isSuspended ? "text-red-500" : "text-orange-500";

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className={`${colorClasses} rounded-lg shadow-md`}>
        <div className="flex flex-col md:flex-row items-center p-6">
          <div className="flex-shrink-0 bg-primary/20 p-4 rounded-full mb-4 md:mb-0 md:mr-6">
            <LockIcon className={`size-10 ${iconColorClass}`} />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-bold mb-2">New notes are temporarily disabled</h3>
            <p className="text-base-content mb-1">
              This account is {daysOverdue} days overdue. Existing notes are unaffected.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubscriptionRestrictedBanner
