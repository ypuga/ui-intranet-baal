const mapBeneficiaries = (beneficiariesData) => {
    const beneficiaries = [];

    const hasData = (fields) => {
        return fields.some(field => {
            const value = beneficiariesData[field];
            return value !== '' && value !== null && value !== undefined;
        });
    };

    const beneficiarioUnoFields = [
        'beneficiarioNombresUno',
        'beneficiarioApellidoPaternoUno',
        'beneficiarioApellidoMaternoUno',
        'beneficiarioParentezcoUno',
    ];
    const beneficiarioDosFields = [
        'beneficiarioNombresDos',
        'beneficiarioApellidoPaternoDos',
        'beneficiarioApellidoMaternoDos',
        'beneficiarioParentezcoDos',
    ];
    const beneficiarioTresFields = [
        'beneficiarioNombresTres',
        'beneficiarioApellidoPaternoTres',
        'beneficiarioApellidoMaternoTres',
        'beneficiarioParentezcoTres',
    ];

    if (hasData(beneficiarioUnoFields)) {
        beneficiaries.push({
            beneficiarioNombres: beneficiariesData.beneficiarioNombresUno,
            beneficiarioPaterno: beneficiariesData.beneficiarioApellidoPaternoUno,
            beneficiarioMaterno: beneficiariesData.beneficiarioApellidoMaternoUno,
            beneficiarioParentezo: beneficiariesData.beneficiarioParentezcoUno,
        });
    }

    if (hasData(beneficiarioDosFields)) {
        beneficiaries.push({
            beneficiarioNombres: beneficiariesData.beneficiarioNombresDos,
            beneficiarioPaterno: beneficiariesData.beneficiarioApellidoPaternoDos,
            beneficiarioMaterno: beneficiariesData.beneficiarioApellidoMaternoDos,
            beneficiarioParentezo: beneficiariesData.beneficiarioParentezcoDos,
        });
    }

    if (hasData(beneficiarioTresFields)) {
        beneficiaries.push({
            beneficiarioNombres: beneficiariesData.beneficiarioNombresTres,
            beneficiarioPaterno: beneficiariesData.beneficiarioApellidoPaternoTres,
            beneficiarioMaterno: beneficiariesData.beneficiarioApellidoMaternoTres,
            beneficiarioParentezo: beneficiariesData.beneficiarioParentezcoTres,
        });
    }

    return beneficiaries;
};

export default mapBeneficiaries;
