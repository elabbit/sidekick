import { useDispatch } from "react-redux"
import ICONS from "../../icons"
import { updatePokemon, updateScore } from "../../store/session"

const PokeGenerator = ({ user }) => {
    const noEvolvePoke = [83, 95, 106, 107, 108, 113, 114, 115, 122, 123, 124, 125, 126, 127, 128, 131, 132, 137, 142, 143, 144, 145, 146, 150, 151]
    const basePoke = [1, 4, 7, 10, 13, 16, 19, 21, 23, 25, 27, 29, 32, 35, 37, 39, 41, 43, 46, 48, 50, 52, 54, 56, 58, 60, 63, 66, 69, 72, 74, 77, 79, 81, 84, 86, 88, 90, 92, 96, 98, 100, 102, 104, 109, 111, 116, 118, 120, 129, 133, 138, 140, 147]
    const starterPoke = [1, 4, 7, 10, 13, 16, 19, 21, 23, 25, 27, 29, 32, 35, 37, 39, 41, 43, 46, 48, 50, 52, 54, 56, 58, 60, 63, 66, 69, 72, 74, 77, 79, 81, 83, 84, 86, 88, 90, 92, 95, 96, 98, 100, 102, 104, 106, 107, 108, 109, 111, 113, 114, 115, 116, 118, 120, 122, 123, 124, 125, 126, 127, 128, 129, 131, 132, 133, 137, 138, 140, 142, 143, 144, 145, 146, 147, 150, 151]
    const basePokeWSec = [1, 2, 4, 5, 7, 8, 10, 11, 13, 14, 16, 17, 19, 21, 23, 25, 27, 29, 30, 32, 33, 35, 37, 39, 41, 43, 44, 46, 48, 50, 52, 54, 56, 58, 60, 61, 63, 64, 66, 67, 69, 70, 72, 74, 75, 77, 79, 81, 84, 86, 88, 90, 92, 93, 96, 98, 100, 102, 104, 109, 111, 116, 118, 120, 129, 133, 138, 140, 147]
    const basePokeWAllEvol = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 109, 110, 111, 112, 116, 117, 118, 119, 120, 121, 129, 130, 133, 134, 135, 136, 138, 139, 140, 141, 147, 148, 149]

    const dispatch = useDispatch();
    let score = user.score;
    let userPokeArr = user.user_icons


    const canEvolve = (pokeNum) => {
        return basePokeWSec.includes(pokeNum)
    }

    let res = []
    for (let i = 0; i < userPokeArr.length; i++) {
        if (canEvolve(userPokeArr[i]) && !userPokeArr.includes(userPokeArr[i] + 1)) {
            res.push(userPokeArr[i] + 1)
        }
    }

    const generatePokemon = async () => {
        if (score - 1 >= 0) {
            const data = await dispatch(updateScore(score - 1));
            let randomStarter = starterPoke[Math.floor(Math.random() * 79)]
            if (!userPokeArr.includes(randomStarter)) {
                const data2 = await dispatch(updatePokemon(randomStarter))
            } else {
                while (userPokeArr.includes(randomStarter)) {
                    randomStarter = starterPoke[Math.floor(Math.random() * 79)]
                }
                await dispatch(updatePokemon(randomStarter))
            }

        } else {
            alert('Do not have enough points to get a Pokemon')
        }

    }

    // const evolvePoke = (pokeNum) => {
    //     let idxOfBase = basePokeWSec.indexOf(pokeNum)

    //     if(idxOfBase === -1){
    //         let newIdxOfBase = basePokeWAllEvol.indexOf(pokeNum)
    //         return basePokeWAllEvol[newIdxOfBase + 1]
    //     }
    //     return basePokeWSec[idxOfBase + 1]
    // }

    const evolvePoke = async () => {
        if (score - 1 >= 0) {
            if (res.length > 0) {
                const data = await dispatch(updateScore(score - 1));
                const data2 = await dispatch(updatePokemon(res[Math.floor(Math.random() * res.length)]))
            } else {
                alert('You do not have any evolutions available')
            }
        } else {
            alert('Do not have enough points to get a Pokemon')
        }
    }

    return (
        <div>
            <button onClick={() => generatePokemon()}>Get a Pokemon</button>
            <button onClick={() => evolvePoke()}>Evolve a Pokemon</button>
        </div>
    )
}

export default PokeGenerator;
