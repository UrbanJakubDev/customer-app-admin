// Define new axios instance with token in headers

export default function formatDate(date) {
   let newDate = new Date(date)
   return newDate.toLocaleDateString()
}