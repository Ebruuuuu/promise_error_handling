const button = document.querySelector('button')
const output = document.querySelector('p')

const getPosition = (opts) => {
  //promise is an object
  const promise = new Promise((resolve, reject) => {
    //1st async task
    navigator.geolocation.getCurrentPosition(
      (success) => {
        resolve(success)
      },
      (error) => {
        reject(error)
      },
      opts
    )
  })
  return promise
}

const setTimer = (duration) => {
  const promise = new Promise((resolve, reject) => {
    //2nd async task
    setTimeout(() => {
      resolve('Done!')
    }, duration)
  })
  return promise
}

function trackUserHandler() {
  let positionData

  //1st async task
  getPosition()
    //promise chaining
    .then((posData) => {
      positionData = posData
      //return another task
      //It returns a promise after 2 seconds
      return setTimer(2000)
    })
    .catch((err) => {
      console.log(err)
      //return another task
      return 'on we go...'
    })
    //data=data of returned promise
    .then((data) => {
      console.log(data, positionData)
    })

  //2nd async task
  //It executes after one second
  setTimer(1000).then(() => {
    console.log('Timer done!')
  })

  console.log('Getting position...')
}

button.addEventListener('click', trackUserHandler)

// let result = 0;

// for (let i = 0; i < 100000000; i++) {
//   result += i;
// }

// console.log(result);
