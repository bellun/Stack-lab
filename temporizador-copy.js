setTimeout(() => {
    console.log('ola em 2 seg')
}, 2000)
let count = 0
let interval = setInterval(() => {
    console.log('Checking')
    count++
    if (count > 5) {
        clearInterval(interval)
    }
}, 5000)