export default function GradientBlobs() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden">
      {/* Top-right blob */}
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-accent/8 via-accent-light/5 to-transparent blur-[80px]" />

      {/* Bottom-left blob */}
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-sage/6 via-accent/4 to-transparent blur-[100px]" />

      {/* Mid-right accent */}
      <div className="absolute top-[40%] -right-20 w-[400px] h-[400px] rounded-full bg-gradient-to-bl from-accent-glow/5 via-transparent to-transparent blur-[90px]" />

      {/* Lower-left warm */}
      <div className="absolute top-[70%] -left-20 w-[350px] h-[350px] rounded-full bg-gradient-to-r from-accent/4 via-sage-light/3 to-transparent blur-[80px]" />
    </div>
  )
}
