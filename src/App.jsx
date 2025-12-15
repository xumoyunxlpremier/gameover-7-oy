import { useState, useEffect } from "react"
import logo from '../src/assets/logo.svg'
import arrow from '../src/assets/arrow.svg'
import audio from '../src/assets/icon-play.svg'
import VirtualKeyboard from './components/VirtualKeyboard'

//skeleton
function SkeletonLoader() {
    return (
        <div className="skeleton-container">
            <div className="skeleton-header">
                <div className="skeleton-word"></div>
                <div className="skeleton-play-btn"></div>
            </div>

            <div className="skeleton-meaning">
                <div className="skeleton-title"></div>
                <div className="skeleton-line"></div>
                <div className="skeleton-line short"></div>
                <div className="skeleton-line"></div>
            </div>

            <div className="skeleton-meaning">
                <div className="skeleton-title"></div>
                <div className="skeleton-line"></div>
                <div className="skeleton-line short"></div>
            </div>
        </div>
    )
}

//search
function DictionarySearch({ onSearch, currentWord, onInputChange }) {
    const [searchTerm, setSearchTerm] = useState("")


    useEffect(() => {
        if (currentWord) {
            setSearchTerm(currentWord)
        }
    }, [currentWord])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (searchTerm.trim()) {
            onSearch(searchTerm.trim())
        }
    }

    const handleInputChange = (e) => {
        const value = e.target.value
        setSearchTerm(value)
        onInputChange(value)
    }

    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <div className="search-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Xush kelibsiz ilhomlandim.uz, mazza qilib tekshiring)"
                    value={searchTerm}
                    onChange={handleInputChange}
                    aria-label="Search for a word"
                    autoComplete="off"
                />

                <button
                    type="submit"
                    className="search-button"
                    aria-label="Search button"

                >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path
                            d="M12.864 11.32h-.813l-.288-.278a6.686 6.686 0 0 0 1.621-4.364 6.68 6.68 0 1 0-6.68 6.679 6.686 6.686 0 0 0 4.364-1.621l.278.288v.813l5.135 5.128 1.532-1.532-5.128-5.135-.021.022Zm-6.16 0a4.62 4.62 0 1 1 0-9.24 4.62 4.62 0 0 1 0 9.24Z"
                            fill="#A445ED"
                        />
                    </svg>
                </button>
            </div>
        </form>
    )
}

//word data
function WordDisplay({ data, onSynonymClick }) {
    const [isPlaying, setIsPlaying] = useState(false)

    // Audio topish
    const audioUrl = data.phonetics?.find((p) => p.audio)?.audio
    const phonetic = data.phonetic || data.phonetics?.find((p) => p.text)?.text

    // voice gapirish
    const playAudio = () => {
        if (audioUrl) {
            const audio = new Audio(audioUrl)
            setIsPlaying(true)
            audio.play()
            audio.onended = () => setIsPlaying(false)
        }
    }

    // Synonym 
    const handleSynonymClick = (synonym) => {
        onSynonymClick(synonym)
    }

    return (
        <div className="word-display">
            <div className="word-header">
                <div className="word-info">
                    <h1 className="word">{data.word}</h1>
                    {phonetic && <p className="phonetic">{phonetic}</p>}
                </div>
                {audioUrl && (
                    <button className="audio"
                        onClick={playAudio}
                        aria-label="Play pronunciation"
                    >
                        <img src={audio} alt="audio" />
                    </button>
                )}
            </div>

            {/* all data */}
            {data.meanings?.map((meaning, idx) => (
                <div key={idx} className="meaning-section">
                    <div className="part-of-speech-container">
                        <h2 className="part-of-speech">{meaning.partOfSpeech}</h2>
                        <div className="divider"></div>
                    </div>

                    <div className="meaning-content">
                        <h3 className="section-title">Meaning</h3>
                        <ul className="definitions-list">
                            {meaning.definitions?.map((def, index) => (
                                <li key={index} className="definition-item">
                                    <p className="definition">{def.definition}</p>
                                    {def.example && <p className="example">{def.example}</p>}
                                </li>
                            ))}
                        </ul>

                        {/* synonym topish */}
                        {meaning.synonyms?.length > 0 && (
                            <div className="synonyms">
                                <span className="section-title">Synonyms:</span>
                                <div className="synonyms-list">
                                    {meaning.synonyms.map((synonym, synIdx) => (
                                        <button
                                            key={synIdx}
                                            className="synonym"
                                            onClick={() => handleSynonymClick(synonym)}
                                            aria-label={`Search for ${synonym}`}
                                        >
                                            {synonym}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ))}

            {/* souce */}
            {data.sourceUrls && data.sourceUrls.length > 0 && (
                <div className="source">
                    <span className="source-label">Source</span>
                    <a
                        href={data.sourceUrls[0]}
                        target="_blank"
                        className="source-link"
                        aria-label="View source"
                    >
                        {data.sourceUrls[0]}
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path
                                d="M6.09 3.545H2.456A1.455 1.455 0 0 0 1 5v6.545A1.455 1.455 0 0 0 2.455 13H9a1.455 1.455 0 0 0 1.455-1.455V7.91m-5.091.727 7.272-7.272m0 0H9m3.636 0V5"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </a>
                </div>
            )}
        </div>
    )
}

//qande ishledi section
function HowItWorks() {
    return (
        <div className="how-it-works-section">
            <h2 className="works-title">How This Site Works <span className="hayol">(33minut oyladim nima qoshsam boladi deb va shu keldi holos xayolimga)</span></h2>
            <div className="works-steps-container">
                <div className="work-step">
                    <span className="step-number">1</span>
                    <h3 className="step-heading">Search (Qidiruv)</h3>
                    <p className="step-description">Siz yuqoridagi maydonda istalgan inglizcha so'zni kiriting va qidiruv tugmasini bosing.</p>
                </div>

                <div className="work-step">
                    <span className="step-number">2</span>
                    <h3 className="step-heading">Fetch Data (Ma'lumotni olish)</h3>
                    <p className="step-description">Ilova so'zingizni lug'at API (dictionaryapi.dev) ga yuboradi va to'liq ma'lumotni oladi.</p>
                </div>

                <div className="work-step">
                    <span className="step-number">3</span>
                    <h3 className="step-heading">Display (Ko'rsatish)</h3>
                    <p className="step-description">Siz darhol ta'rif, talaffuz, sinonimlar va misollarni chiroyli formatda ko'rasiz.</p>
                </div>

                <div className="work-step">
                    <h3 className="step-heading">Powered by <a target="_blank" href="https://foziljonovxumoyun.uz">foziljonovxumoyun.uz</a>
                    </h3>
                    <br />
                    <h3 className="step-heading">Keyboard inspired by <a target="_blank" href="https://botirdev.uz">botirdev.uz</a>
                    </h3>

                </div>
            </div>
        </div>
    );
}

//app aka
function App() {
    const [darkMode, setDarkMode] = useState(true)
    const [font, setFont] = useState("sans")
    const [wordData, setWordData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [_, setSearchHistory] = useState([])
    const [currentWord, setCurrentWord] = useState("")
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [keyboardOpen, setKeyboardOpen] = useState(false)


    useEffect(() => {
        document.body.className = darkMode ? "dark" : "light"
    }, [darkMode])


    useEffect(() => {
        document.body.setAttribute("data-font", font)
    }, [font])


    useEffect(() => {

        const handlePopState = (event) => {
            if (event.state && event.state.word) {
                searchWord(event.state.word, false)
            }
        }

        window.addEventListener('popstate', handlePopState)

        return () => {
            window.removeEventListener('popstate', handlePopState)
        }
    }, [])

    // So'z find
    const searchWord = async (word, pushState = true) => {
        if (!word.trim()) return

        setLoading(true)
        setError(null)
        setWordData(null)
        setCurrentWord(word)

        try {
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)

            if (!response.ok) {
                throw new Error("Word not found. Please try another word.")
            }

            const data = await response.json()
            setWordData(data[0])

            // Search history ga qo'shish
            setSearchHistory(prev => {
                const newHistory = [word, ...prev.filter(w => w !== word)]
                return newHistory
            })

            // Browser history ga qo'shish (pushState true bo'lsa)
            if (pushState) {
                window.history.pushState({ word }, '', `?word=${encodeURIComponent(word)}`)
            }
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    // Synonym 
    const handleSynonymClick = (synonym) => {
        searchWord(synonym)
    }

    // Font nomlari
    const fontNames = {
        sans: "Sans Serif",
        serif: "Serif",
        mono: "Mono"
    }

    // Input o'zgarishi
    const handleInputChange = (value) => {
        setCurrentWord(value)
    }

    return (
        <div className="app">
            <header className="header">
                {/* Logo */}
                <div className="logo" aria-label="Dictionary logo">
                    <img src={logo} alt="logo" />
                </div>

                {/* Font selector va theme toggle */}
                <div className="controls">
                    {/* font dropdown */}
                    <div className="font-dropdown">
                        <button
                            className="font-select-button"
                            onClick={() => setDropdownOpen(!dropdownOpen)}

                        >
                            <span>{fontNames[font]}</span>
                            <img src={arrow} alt="arrow" />
                        </button>

                        {/* Dropdown menyu */}
                        {dropdownOpen && (
                            <div className="font-dropdown-menu">
                                <button
                                    className={`font-option ${font === 'sans' ? 'active' : ''}`}
                                    onClick={() => {
                                        setFont('sans')
                                        setDropdownOpen(false)
                                    }}
                                    data-font="sans"
                                >
                                    Sans Serif
                                    {font === 'sans' && <span className="checkmark">✓</span>}
                                </button>
                                <button
                                    className={`font-option ${font === 'serif' ? 'active' : ''}`}
                                    onClick={() => {
                                        setFont('serif')
                                        setDropdownOpen(false)
                                    }}
                                    data-font="serif"
                                >
                                    Serif
                                    {font === 'serif' && <span className="checkmark">✓</span>}
                                </button>
                                <button
                                    className={`font-option ${font === 'mono' ? 'active' : ''}`}
                                    onClick={() => {
                                        setFont('mono')
                                        setDropdownOpen(false)
                                    }}
                                    data-font="mono"
                                >
                                    Mono
                                    {font === 'mono' && <span className="checkmark">✓</span>}
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Divider */}
                    <div className="divider-vertical"></div>

                    {/* Theme toggle switch */}
                    <label className="theme-toggle" aria-label="Toggle dark mode">
                        <input
                            type="checkbox"
                            checked={darkMode}
                            onChange={(e) => setDarkMode(e.target.checked)}
                            aria-label="Dark mode toggle"
                        />
                        <span className="slider"></span>
                    </label>

                    <svg
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        className="moon-icon"
                        aria-hidden="true"
                    >
                        <path
                            d="M1 10.449a10.544 10.544 0 0 0 19.993 4.686C11.544 15.135 6.858 10.448 6.858 1A10.545 10.545 0 0 0 1 10.449Z"
                            stroke={darkMode ? "#A445ED" : "#757575"}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                        />
                    </svg>
                </div>
            </header>



            <main className="main">
                <DictionarySearch
                    onSearch={searchWord}
                    currentWord={currentWord}
                    onInputChange={handleInputChange}
                />

                {!loading && !error && !wordData && !currentWord && (
                    <>
                        <div className="welcome-message">
                            <p>Welcome to the Dictionary App!</p>
                            <p>Search for any word to see its definition, pronunciation, and examples.</p>
                        </div>
                        <HowItWorks />
                    </>
                )}

                {/* Loading skeleton */}
                {loading && <SkeletonLoader />}

                {/* Error message */}
                {error && (
                    <div className="error">
                        <div className="error-emoji">😕</div>
                        <h2>Sorry pal, we couldn't find definitions for the word you were looking for.</h2>
                        <p>You can try the search again at later time or head to the web instead.</p>
                    </div>
                )}

                {/* Word display */}
                {wordData && <WordDisplay data={wordData} onSynonymClick={handleSynonymClick} />}
            </main>

            {/* Virtual Keyboard */}
            <VirtualKeyboard
                isOpen={keyboardOpen}
                onToggle={() => setKeyboardOpen(!keyboardOpen)}
                onInput={(value) => setCurrentWord(value)}
                onEnter={(value) => {
                    searchWord(value)
                    setKeyboardOpen(false)
                }}
                onEscape={() => setKeyboardOpen(false)}
            />
        </div>
    )
}

export default App