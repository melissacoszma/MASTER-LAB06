import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const DAYS = [
  'Lunes', 
  'Martes', 
  'Miércoles', 
  'Jueves',
  'Viernes', 
  'Sábado', 
  'Domingo',
]

export const MEAL_TIMES = [ // el orden en que se exporta este array es importante!!!
  'Comida', 
  'Cena',
]



export const useMealsStore = defineStore('meals', () => {

  // ref() convierte un valor normal en reactivo, cuando cambia, Vue repinta
  // solo los trozos de pantalla que lo usan. Sin ref cambiaría el array y la pantalla se quedaría igual
  
  const meals = ref([])      // todas las comidas planificadas de la semana
  const favorites = ref([])  // nombres de platos favoritos, independiente del plan


  // computed crea un valor que se recalcula solo cuando cambian los datos
  // de los que depende, aquí transformamos la lista plana en el agrupado por días 
  
  const mealsByDay = computed(() => {

    const grouped = {}

    for (const day of DAYS) { // creamos los 7 días vacios primero para que la vista pinte siempre la semana completa, los días vacíos tienen que verse

      grouped[day] = []
    }

    for (const meal of meals.value) {
    
      if (grouped[meal.day]) {           // aseguramos que las comidas inexistentes o cambiantes no generen fallos
        grouped[meal.day].push(meal)
      }
    }

     for (const day of DAYS) {
      grouped[day].sort(
        (a, b) => MEAL_TIMES.indexOf(a.mealTime) - MEAL_TIMES.indexOf(b.mealTime) // establecemos el orden de las comidas
      )
    }

    return grouped

  }) 

  const totalMeals = computed(() => meals.value.length) // numero total de platos

  // funciones que modifican el estado

  function addMeal({ name, day, mealTime }) {

    const cleanName = name.trim()  // trim() quita espacios sobrantes para que "  Lentejas" y "Lentejas" sena lo mismo y no dos platos diferentes
    if (!cleanName) return  // no añadimos platos sin nombre

    meals.value.push({
     
      id: crypto.randomUUID(),  // crypto.randomUUID() genera un identificador unico, la posicion en el array se desplazan a medida que se añaden o eliminan platos asi que no sirve
      name: cleanName,
      day,
      mealTime,
    })
  }

  function removeMeal(id) {
    
    const index = meals.value.findIndex((meal) => meal.id === id) // findIndex + splice modifica el array existente.
    if (index !== -1) {
      meals.value.splice(index, 1)
    }
  }

  function updateMeal(id, changes) {
    const meal = meals.value.find((m) => m.id === id)
    if (!meal) return

    Object.assign(meal, changes)  // object.assign copia solo las propiedades que vengan en 'changes' sirve para editar campos sin tener que manejar una funcion distinta por cada uno

    
    if (changes.name) { // si han cambiado el nombre lo limpiamos igual que al crear
      meal.name = changes.name.trim()
    }
  }

  function clearPlan() {
    
    meals.value = [] // vaciamos SOLO el plan, los favoritos se quedan intactos
  }

  //  FAVORITOS 

  function isFavorite(name) {
    return favorites.value.includes(name.trim())
  }

  function toggleFavorite(name) {  // un solo boton para añadir o quitar fav según el estado actual
    
    const cleanName = name.trim()
    const index = favorites.value.indexOf(cleanName)

    if (index === -1) {
      favorites.value.push(cleanName)
    } else {
      favorites.value.splice(index, 1)
    }
  }

 
  function addFavoriteToPlan(name, day, mealTime) {   // podemos reutilizar un favorito creando una comida nueva en el plan
    addMeal({ name, day, mealTime })
  }

  // OJO en la sintaxis setup store hay que devolver TODO lo que
  // queramos usar desde fuera. Lo que no devolvemos se queda privado al store y los componentes no podrán acceder 

  return {
    meals,
    favorites,
    mealsByDay,
    totalMeals,
    addMeal,
    removeMeal,
    updateMeal,
    clearPlan,
    isFavorite,
    toggleFavorite,
    addFavoriteToPlan,
  }
})
