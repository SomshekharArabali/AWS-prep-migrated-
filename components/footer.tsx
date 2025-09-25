export function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-8">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">A</span>
          </div>
          <span className="font-bold text-xl">AWS Prep</span>
        </div>
        <p className="text-slate-400">Comprehensive AWS Cloud Practitioner exam preparation platform</p>
      </div>
    </footer>
  )
}
