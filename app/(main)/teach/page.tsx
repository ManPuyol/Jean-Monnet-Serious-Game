'use client'

export default function  NoSubject() {
  return (
    <div
      className="flex h-full flex-1 items-center justify-center"
    >
      <div className="flex justify-center h-full flex-col items-center gap-1 text-center ">
        <h3 className="text-2xl font-bold tracking-tight">
          No subject selected
        </h3>
        <p className="text-sm text-muted-foreground">
          Select a subject from the sidebar to get started
        </p>
      </div>
    </div>
  )
}
