const Footer = () => {
    const currentYear: number = new Date().getFullYear()

    return (
        <footer className="bg-slate-800 text-white">
            <div className="container mx-auto py-8 text-center text-sm space-y-2">
                <p>&copy; {currentYear} D&D Companion — Coding Factory 9 AUEB Final Project</p>
                <p className="text-slate-400 max-w-3xl mx-auto">
                    This work includes material taken from the System Reference Document 5.1
                    ("SRD 5.1") by Wizards of the Coast LLC and available at{" "}
                    <a href="https://dnd.wizards.com/resources/systems-reference-document" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
                        https://dnd.wizards.com/resources/systems-reference-document
                    </a>
                    . The SRD 5.1 is licensed under the Creative Commons Attribution 4.0
                    International License available at{" "}
                    <a href="https://creativecommons.org/licenses/by/4.0/legalcode" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
                        https://creativecommons.org/licenses/by/4.0/legalcode
                    </a>
                    .
                </p>
            </div>
        </footer>
    )
}

export default Footer