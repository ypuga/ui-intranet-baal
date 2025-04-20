const valores = {
    101: "CLIENTE UNICO",
    104: "ALAMEDA EXPRESS",
    108: "CUENTA ALAMEDA N2",
    105: "CUENTA ALAMEDA N4",
    114: "INVERSION ALAMEDA",
    116: "TPV",
    125: "TDC ALAMEDA MASTER CARD",
    127: "TDC ALAMEDA GOLD",
    130: "TDC ALAMEDA PLATINUM",
    187: "CRM CREDITO MOTO",
    154: "CRE CREDITO EFECTIVO INMEDIATO",
    190: "CRA CREDITO AUTO"
};

const getIdByName = (nombre) => {
    const entry = Object.entries(valores).find(
        ([, value]) => value === nombre
    );
    return entry ? Number(entry[0]) : null;
};

export default {
    getIdByName
};