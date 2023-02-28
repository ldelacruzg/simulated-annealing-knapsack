interface Item {
  value: number;
  weight: number;
}

// Implementamos el algoritmo de recocido simulado para resolver el problema de la mochila
function simulatedAnnealingKnapsack(
  items: Item[],
  maxWeight: number,
  initialTemp: number,
  coolingRate: number,
  stoppingTemp: number,
  maxIterations: number
): { solution: boolean[]; totalValue: number } {
  // Inicializamos la solución actual como una solución aleatoria
  let currentSolution = generateRandomSolution(items.length);
  let currentWeight = calculateWeight(items, currentSolution);
  let currentValue = calculateValue(items, currentSolution);

  // La mejor solución inicial es la solución aleatoria
  let bestSolution = currentSolution;
  let bestValue = currentValue;

  // Inicializamos la temperatura actual
  let temperature = initialTemp;

  // Ejecutamos el algoritmo mientras no se alcance la temperatura de detención o el número máximo de iteraciones
  for (let i = 0; i < maxIterations && temperature > stoppingTemp; i++) {
    // Generamos una nueva solución vecina
    const newSolution = generateNeighborSolution(currentSolution);
    const newWeight = calculateWeight(items, newSolution);

    // Si la nueva solución no excede el peso máximo, la evaluamos
    if (newWeight <= maxWeight) {
      const newValue = calculateValue(items, newSolution);

      // Calculamos la diferencia entre el valor de la nueva solución y el valor de la solución actual
      const delta = newValue - currentValue;

      // Si la nueva solución es mejor, la aceptamos
      if (delta > 0 || Math.exp(delta / temperature) > Math.random()) {
        currentSolution = newSolution;
        currentWeight = newWeight;
        currentValue = newValue;
      }

      // Si la solución actual es mejor que la mejor solución conocida, actualizamos la mejor solución
      if (currentValue > bestValue) {
        bestSolution = currentSolution;
        bestValue = currentValue;
      }
    }

    // Enfriamos la temperatura
    temperature *= coolingRate;
  }

  // Devolvemos la mejor solución encontrada y su valor total
  return { solution: bestSolution, totalValue: bestValue };
}

// Genera una solución aleatoria para el problema de la mochila
function generateRandomSolution(length: number): boolean[] {
  const solution: boolean[] = [];
  for (let i = 0; i < length; i++) {
    solution.push(Math.random() < 0.5);
  }
  return solution;
}

// Genera una nueva solución vecina a partir de la solución actual
function generateNeighborSolution(solution: boolean[]): boolean[] {
  const newSolution = [...solution];
  const index = Math.floor(Math.random() * solution.length);
  newSolution[index] = !newSolution[index];
  return newSolution;
}

// Calcula el peso total de una solución para el problema de la mochila
function calculateWeight(items: Item[], solution: boolean[]): number {
  let weight = 0;
  for (let i = 0; i < items.length; i++) {
    if (solution[i]) {
      weight += items[i].weight;
    }
  }
  return weight;
}

// Calcula el valor total de una solución para el problema de la mochila
function calculateValue(items: Item[], solution: boolean[]): number {
  let value = 0;
  for (let i = 0; i < items.length; i++) {
    if (solution[i]) {
      value += items[i].value;
    }
  }
  return value;
}

// Ejecución
const items = [
  { value: 60, weight: 10 },
  { value: 100, weight: 20 },
  { value: 120, weight: 30 },
  { value: 80, weight: 40 },
  { value: 200, weight: 50 },
];

const maxWeight = 100;
const initialTemp = 100;
const coolingRate = 0.95;
const stoppingTemp = 0.1;
const maxIterations = 10000;

const result = simulatedAnnealingKnapsack(
  items,
  maxWeight,
  initialTemp,
  coolingRate,
  stoppingTemp,
  maxIterations
);

console.log("Solution: ", result.solution);
console.log("Total value: ", result.totalValue);
