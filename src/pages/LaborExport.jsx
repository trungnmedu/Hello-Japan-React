import LaborExportInfo from "@components/LaborExport/LaborExportInfo/LaborExportInfo"
import Overall from "@src/components/LaborExport/Overall/Overall"
import Price from "@src/components/LaborExport/Price/Price"
import Procedure from "@src/components/LaborExport/Procedure/Procedure"

const LaborExport = () => {
    return (
        <>
            <LaborExportInfo />
            <Overall />
            <Price />
            <Procedure />
        </>
    )
}

export default LaborExport