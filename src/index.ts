import cluster from "node:cluster";
import { availableParallelism } from "node:os";

if (cluster.isPrimary) {
  const numCPUs = availableParallelism();
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    process.exit(1);
  });
} else import("./server");
