
const useHoliday = () => {
    /**
     * Formatea una fecha para mostrar
     */
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);

        const months = [
            "enero", "febrero", "marzo", "abril",
            "mayo", "junio", "julio", "agosto",
            "septiembre", "octubre", "noviembre", "diciembre"
        ];

        const day = String(date.getDate()).padStart(2, '0');
        const monthName = months[date.getMonth()];

        return `${monthName}/${day}`;
    }

    return {
        formatDate
    }
}

export default useHoliday
