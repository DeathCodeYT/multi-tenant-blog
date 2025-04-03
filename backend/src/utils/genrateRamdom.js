export const genrateRandom=(limit=999999)=>{
    let randomNumber = Math.floor(Math.random()*limit+1)
    let formattedNumber = randomNumber.toString().padStart(limit.toString().length,'0')
    return formattedNumber
}