import StudyAbroadInfo from "@components/StudyAbroad/StudyAbroadInfo/StudyAbroadInfo"
import Overall from "@src/components/StudyAbroad/Overall/Overall"
import Price from "@src/components/StudyAbroad/Price/Price"
import Procedure from "@src/components/StudyAbroad/Procedure/Procedure"

const StudyAboard = () => {
    return (
        <>
            <StudyAbroadInfo />
            <Overall />
            <Price />
            <Procedure />
        </>
    )
}

export default StudyAboard