import axios from 'axios'

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY
const BASE_URL = process.env.NEXXT_PUBLIC_TMDB_BASE_URL

export const getTrendingMoview = async (type: string) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/trending/${type}/day?api_key=${API_KEY}`
    )
    return data
  } catch (error) {
    console.log(error)
  }
}
