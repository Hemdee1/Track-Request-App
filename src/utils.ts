export const widthSetter:string = "xl:w-[1200px] sm:w-3/4 w-[96%]"

export const Logger = (err:any) => {
  console.log(err)
}

export function selectRandom():number[]{

  //generate an array of random numbers between 1 and 20
  let selected:number[] = []

  while(selected.length < 3) {
    const randomPick = Math.ceil(Math.random() * 19 );
    if(!selected.includes(randomPick)) selected.push(randomPick)
  }
  return selected
}
