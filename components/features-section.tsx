import { Wallet, RefreshCcw, PiggyBank, Clock, ShieldCheck, Home } from "lucide-react"

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-normal tracking-tight text-[#10172A] mb-4">Why Should You Lower Your Rate?</h2>
          <p className="text-lg text-slate-600">
            We do the tracking, when we hit your target reduction you get notified and we get you a lower payment.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Lower Payments Card */}
          <div className="relative p-6 rounded-2xl border border-slate-200 bg-white">
            <div className="mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted">
                <Wallet className="w-6 h-6 text-primary" />
              </div>
            </div>
            <h3 className="text-xl font-normal text-[#10172A] mb-2">Lower Payments</h3>
            <p className="text-slate-600">Lower payment frees up cash flow so you can do more with your money</p>
          </div>

          {/* Debt Consolidation Card */}
          <div className="relative p-6 rounded-2xl border border-slate-200 bg-white">
            <div className="mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted">
                <RefreshCcw className="w-6 h-6 text-primary" />
              </div>
            </div>
            <h3 className="text-xl font-normal text-[#10172A] mb-2">Debt Consolidation</h3>
            <p className="text-slate-600">Get rid of high interest credit card payments</p>
          </div>

          {/* Lower Interest Card */}
          <div className="relative p-6 rounded-2xl border border-slate-200 bg-white">
            <div className="mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted">
                <PiggyBank className="w-6 h-6 text-primary" />
              </div>
            </div>
            <h3 className="text-xl font-normal text-[#10172A] mb-2">Lower Interest</h3>
            <p className="text-slate-600">Don't throw your hard earned cash out the window</p>
          </div>

          {/* Shorten Term Card */}
          <div className="relative p-6 rounded-2xl border border-slate-200 bg-white">
            <div className="mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted">
                <Clock className="w-6 h-6 text-primary" />
              </div>
            </div>
            <h3 className="text-xl font-normal text-[#10172A] mb-2">Shorten Your Term</h3>
            <p className="text-slate-600">Pay off your mortgage faster and save thousands in interest</p>
          </div>

          {/* Remove PMI Card */}
          <div className="relative p-6 rounded-2xl border border-slate-200 bg-white">
            <div className="mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
            </div>
            <h3 className="text-xl font-normal text-[#10172A] mb-2">Remove Mortgage Insurance</h3>
            <p className="text-slate-600">Eliminate PMI payments when your equity reaches 20%</p>
          </div>

          {/* New Home Purchase Card */}
          <div className="relative p-6 rounded-2xl border border-slate-200 bg-white">
            <div className="mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted">
                <Home className="w-6 h-6 text-primary" />
              </div>
            </div>
            <h3 className="text-xl font-normal text-[#10172A] mb-2">New Home Purchase</h3>
            <p className="text-slate-600">Get the best rate for your dream home from the start</p>
          </div>
        </div>
      </div>
    </section>
  )
}

