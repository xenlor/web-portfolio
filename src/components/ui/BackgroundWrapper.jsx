import React from 'react';

// Estrellas definidas estáticamente — sin Math.random() en render
const STARS = [
  { top: '8%',  left: '12%',  size: 2,   dur: '3.1s', delay: '0s'    },
  { top: '15%', left: '78%',  size: 1.5, dur: '4.2s', delay: '1.2s'  },
  { top: '22%', left: '45%',  size: 1,   dur: '5.0s', delay: '0.5s'  },
  { top: '5%',  left: '60%',  size: 2.5, dur: '3.8s', delay: '2.1s'  },
  { top: '35%', left: '88%',  size: 1,   dur: '4.5s', delay: '0.8s'  },
  { top: '48%', left: '5%',   size: 2,   dur: '3.3s', delay: '1.9s'  },
  { top: '60%', left: '30%',  size: 1.5, dur: '5.5s', delay: '0.3s'  },
  { top: '72%', left: '70%',  size: 1,   dur: '4.0s', delay: '2.7s'  },
  { top: '18%', left: '25%',  size: 3,   dur: '6.0s', delay: '1.5s'  },
  { top: '80%', left: '15%',  size: 1.5, dur: '3.7s', delay: '0.9s'  },
  { top: '90%', left: '55%',  size: 2,   dur: '4.8s', delay: '3.1s'  },
  { top: '40%', left: '92%',  size: 1,   dur: '5.2s', delay: '1.1s'  },
  { top: '55%', left: '48%',  size: 2.5, dur: '3.5s', delay: '2.4s'  },
  { top: '28%', left: '62%',  size: 1,   dur: '4.3s', delay: '0.6s'  },
  { top: '65%', left: '82%',  size: 1.5, dur: '5.8s', delay: '1.8s'  },
  { top: '12%', left: '38%',  size: 2,   dur: '3.9s', delay: '2.9s'  },
  { top: '85%', left: '37%',  size: 1,   dur: '4.6s', delay: '0.2s'  },
  { top: '3%',  left: '85%',  size: 2.5, dur: '5.3s', delay: '1.4s'  },
  { top: '75%', left: '95%',  size: 1,   dur: '3.2s', delay: '2.2s'  },
  { top: '50%', left: '20%',  size: 1.5, dur: '4.9s', delay: '0.7s'  },
];

const BackgroundWrapper = ({ performanceMode = false }) => (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#f5f3ff] dark:bg-[#06040f]">

        {/* Patrón de rejilla */}
        <div
            className={`absolute inset-0
        bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)]
        dark:bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)]
        bg-[size:4rem_4rem]
        ${!performanceMode
                    ? '[mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]'
                    : 'opacity-20'
                }`}
        />

        {!performanceMode ? (
            <>
                {/* ── Aurora 4 capas ── */}
                <div className="aurora aurora-1 aurora-purple absolute -top-[25%] left-[5%]   w-[65vw] h-[65vw] max-w-[750px] max-h-[750px] rounded-full" />
                <div className="aurora aurora-2 aurora-indigo  absolute top-[15%]  right-[-8%]  w-[55vw] h-[55vw] max-w-[650px] max-h-[650px] rounded-full" />
                <div className="aurora aurora-3 aurora-violet  absolute bottom-[-20%] left-[25%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full" />
                <div className="aurora aurora-4 aurora-blue    absolute top-[45%]  left-[-5%]  w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full" />

                {/* ── Estrellas (solo en modo oscuro) ── */}
                <div className="hidden dark:block absolute inset-0">
                    {STARS.map((s, i) => (
                        <span
                            key={i}
                            className="star"
                            style={{
                                top: s.top,
                                left: s.left,
                                width: `${s.size}px`,
                                height: `${s.size}px`,
                                animationDuration: s.dur,
                                animationDelay: s.delay,
                            }}
                        />
                    ))}
                </div>
            </>
        ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-indigo-500/5 dark:from-purple-900/10 dark:via-transparent dark:to-indigo-900/10" />
        )}
    </div>
);

export default BackgroundWrapper;
