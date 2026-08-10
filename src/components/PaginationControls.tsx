import { Button } from "@/components/ui/button.tsx"

type PaginationControlsProps = {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

export function PaginationControls({ currentPage, totalPages, onPageChange }: PaginationControlsProps) {
    if (totalPages <= 1) return null

    return (
        <div className="flex items-center justify-center gap-2 mt-6">
            <Button
                variant="secondary"
                disabled={currentPage === 0}
                onClick={() => onPageChange(0)}
            >
                First
            </Button>

            <Button
                variant="secondary"
                disabled={currentPage === 0}
                onClick={() => onPageChange(currentPage - 1)}
            >
                Previous
            </Button>

            <span className="text-sm px-2">
        Page {currentPage + 1} of {totalPages}
      </span>

            <Button
                variant="secondary"
                disabled={currentPage === totalPages - 1}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Next
            </Button>

            <Button
                variant="secondary"
                disabled={currentPage === totalPages - 1}
                onClick={() => onPageChange(totalPages - 1)}
            >
                Last
            </Button>
        </div>
    )
}