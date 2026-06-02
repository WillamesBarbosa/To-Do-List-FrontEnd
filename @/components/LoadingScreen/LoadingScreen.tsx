export function LoadingScreen() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-background">
            <svg width="120" height="120" viewBox="0 0 160 160">
                <circle cx="80" cy="80" r="60" fill="none" stroke="#1a1a1a" strokeWidth="8"/>
                <circle
                    cx="80" cy="80" r="60"
                    fill="none"
                    stroke="#7c3aed"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray="330"
                    strokeDashoffset="66"
                >
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 80 80"
                        to="360 80 80"
                        dur="1.2s"
                        repeatCount="indefinite"
                    />
                </circle>
            </svg>
            <p className="mt-6 text-2xl font-light text-white tracking-[10px]">KRON</p>
        </div>
    )
}