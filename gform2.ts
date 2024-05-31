type Location = string;
type Trip = { from: Location, to: Location };

const validateTrips = (
  pickups: Location[],
  drops: Location[],
  trips: Trip[]
): boolean => {
  const adjacencyList: { [key: string]: Location[] } = {};

  trips.forEach(trip => {
    if (!adjacencyList[trip.from]) {
      adjacencyList[trip.from] = [];
    }
    adjacencyList[trip.from].push(trip.to);
  });

  const dfs = (start: Location, visited: Set<Location>): void => {
    visited.add(start);
    if (adjacencyList[start]) {
      adjacencyList[start].forEach(neighbor => {
        if (!visited.has(neighbor)) {
          dfs(neighbor, visited);
        }
      });
    }
  };

  const pickupSet = new Set(pickups);
  for (const trip of trips) {
    pickupSet.delete(trip.from);
  }
  if (pickupSet.size > 0) return false;

  const dropSet = new Set(drops);
  const visitedFromPickup = new Set<Location>();
  pickups.forEach(pickup => {
    dfs(pickup, visitedFromPickup);
  });

  for (const drop of drops) {
    if (!visitedFromPickup.has(drop)) return false;
  }

  const visitedFromWarehouse = new Set<Location>();
  const warehouses = trips
    .filter(trip => !pickups.includes(trip.from) && !drops.includes(trip.from))
    .map(trip => trip.from);

  warehouses.forEach(warehouse => {
    dfs(warehouse, visitedFromWarehouse);
  });

  for (const drop of drops) {
    if (!visitedFromWarehouse.has(drop)) return false;
  }

  return true;
};

const pickups = ["A", "B"];
const drops = ["C", "D"];
const validTrips: Trip[] = [
  { from: "A", to: "W" },
  { from: "B", to: "W" },
  { from: "W", to: "C" },
  { from: "W", to: "D" }
];

const invalidTrips: Trip[] = [
  { from: "A", to: "W1" },
  { from: "B", to: "W2" },
  { from: "W3", to: "C" },
  { from: "W4", to: "D" }
];

console.log(validateTrips(pickups, drops, validTrips)); 
console.log(validateTrips(pickups, drops, invalidTrips)); 
