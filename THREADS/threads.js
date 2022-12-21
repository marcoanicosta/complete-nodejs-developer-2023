const { isMainThread, workerData, Worker } = require('worker_threads');

if (isMainThread) {
    console.log(`Main Thread! Proccess ID: ${process.pid}`);
    new Worker(__filename, {
        workerData: [7,6,2,3]
    });
    new Worker(__filename, {
        workerData: [1,5,2,3]
    });
} else {
    console.log(`Worker! Proccess ID: ${process.pid}`);
    console.log(`${workerData} sorted is ${workerData.sort()}`);

}
