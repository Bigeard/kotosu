
const getRandom = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
}


const getTime = (time: number) => {
    return (Date.now() - time);
}


export { getRandom, getTime }