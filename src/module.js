console.log("module")

async function start() {
  await Promise.resolve('async work')
}

start().then(console.log())