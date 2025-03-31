export function useDateFormater(){
    function formatDate(date: Date) {
        return new Date(date).toLocaleDateString();
    }

    return {
        formatDate
    }
}
