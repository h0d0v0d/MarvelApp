import { useState, useCallback } from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [itemLoading, setItemLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback(async (url, method = 'GET', body = null, headers={'Content-Type': 'aplication/json'}) => {
        setLoading(true)
        setItemLoading(true)

        try {
            const response = await fetch(url, {method, body, headers})

            if (!response.ok) {
                throw new Error(`Не получается отправитть запрос на сервер ${url}, стастус ошибки - ${response.status}`);
            }

            const data = await response.json()

            setLoading(false)
            setItemLoading(false)
            return data
        } catch(e) {
            setLoading(false)
            setItemLoading(false)
            setError(e)
            throw new Error('Возникла ошибка при отправке запроса на сервер')
        }

    }, [])

    const clearError = useCallback(() => {setError(null)}, [])

    return {
        loading,
        itemLoading,
        request,
        error,
        clearError
    }
}