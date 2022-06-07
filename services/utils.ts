// Format date from MySQL timestamp to human readable format
export function formatDate(date: string) {
   let newDate = new Date(date )

   return newDate.toLocaleDateString('cz-CZ', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      })
}

export function filterDataArray(data: [], keep_items: string[]) {
   let newData: any[] = []
   for (let key in data) {
      if (keep_items.includes(key)) {
         newData[key] = data[key]
      }
   }
   return newData
}