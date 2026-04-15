/* eslint-disable no-return-assign */
/* eslint-disable react/no-children-prop */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import { ArrowRight } from 'feather-icons-react';
import CreditModal from './CreditModal';
import {
  carOptions,
  dependentsOptions,
  educationOptions,
  loanTypeOptions,
  martialStatusOptions,
  realEstateOptions,
  securedOptions,
  termUnitOptions,
} from '../../utils/SelectEnumes';
import {
  InputFilLabelled,
  SelectFieldLabelled,
  StyledButton,
  ToggleField,
} from './ReusableInputs/MainAppStyledElements';
import { CREDIT_KEY } from '../constants/constants';

export default function CreditForm({ userData, handleReqUpd }) {
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);

  const initialState = {
    loanType: '',
    amount: '',
    term: '',
    unit: 'M',
    secured: '',
    education: '',
    martialStatus: '',
    dependents: '',
    realEstate: '',
    car: '',
  };

  const fieldLabels = {
    loanType: 'Тип кредита',
    amount: 'Сумма кредита',
    term: 'Срок кредита',
    secured: 'Наличие обеспечения',
    education: 'Образование',
    martialStatus: 'Семейное положение',
    dependents: 'Количество иждивенцев',
    realEstate: 'Наличие недвижимости',
    car: 'Наличие автомобиля',
  };

  const [creditData, setCreditData] = React.useState(() => {
    const saved = localStorage.getItem(CREDIT_KEY);
    return saved ? JSON.parse(saved) : initialState;
  });
  const [errors, setErrors] = React.useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCreditData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: false,
    }));
  };

  const checkEmptyFields = (obj) => {
    const emptyFields = [];

    Object.entries(obj).forEach(([key, value]) => {
      if (value === null || value === '' || value === 'undefined') {
        emptyFields.push(key);
      }
    });
    return emptyFields;
  };

  const handleContinue = () => {
    const emptyFields = checkEmptyFields(creditData);
    if (emptyFields.length > 0) {
      const newErrors = {};
      emptyFields.map((field) => (newErrors[field] = true));
      setErrors(newErrors);
    } else {
      setOpenConfirmationModal(true);
    }
  };

  React.useEffect(() => {
    localStorage.setItem(CREDIT_KEY, JSON.stringify(creditData));
  }, [creditData]);

  return (
    <>
      <Box>
        <form>
          <Box sx={{ display: 'flex', gap: 14, mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, width: '100%' }}>
              <Box sx={{ flex: 1 }}>
                <SelectFieldLabelled
                  label="Вид кредита"
                  options={loanTypeOptions}
                  name="loanType"
                  value={creditData.loanType}
                  onChange={handleChange}
                  error={errors.loanType}
                />
              </Box>

              <Box sx={{ flex: 1 }}>
                <InputFilLabelled
                  label="Сумма кредита (BYN)"
                  name="amount"
                  value={creditData.amount}
                  onChange={handleChange}
                  error={errors.amount}
                />
              </Box>

              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 0.5,
                  width: '100%',
                }}
              >
                <InputFilLabelled
                  label="Срок кредита"
                  placeholder="6"
                  name="term"
                  type="number"
                  value={creditData.term}
                  onChange={handleChange}
                  error={errors.term}
                  rootSx={{ flex: 1 }}
                />
                <SelectFieldLabelled
                  label="&nbsp;"
                  options={termUnitOptions}
                  name="unit"
                  value={creditData.unit}
                  onChange={handleChange}
                  error={errors.unit}
                  rootSx={{ flex: 0.8 }}
                />
              </Box>

              <Box sx={{ flex: 1 }}>
                <SelectFieldLabelled
                  label="Тип обеспечения"
                  options={securedOptions}
                  name="secured"
                  value={creditData.secured}
                  onChange={handleChange}
                  error={errors.secured}
                />
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              mb: 4,
              backgroundColor: '#F1F0FF',
              padding: '30px 60px',
              margin: '0px -60px',
              opacity: '100%',
            }}
          >
            <Box className="block-title" sx={{ mb: '16px' }}>
              Обязательная информация
            </Box>

            <Box className="main-subtitle" sx={{ mb: '24px' }}>
              Укажите дополнительные данные для корректного поиска кредита
            </Box>

            <Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Box sx={{ flex: 0.2 }}>
                  <SelectFieldLabelled
                    label="Образование"
                    options={educationOptions}
                    name="education"
                    value={creditData.education}
                    onChange={handleChange}
                    error={errors.education}
                  />
                </Box>
                <Box sx={{ flex: 0.2 }}>
                  <SelectFieldLabelled
                    label="Семейное положение"
                    options={martialStatusOptions}
                    name="martialStatus"
                    value={creditData.martialStatus}
                    onChange={handleChange}
                    error={errors.martialStatus}
                  />
                </Box>
                <Box sx={{ flex: 0.2 }}>
                  <SelectFieldLabelled
                    label="Количество иждивенцев"
                    options={dependentsOptions}
                    name="dependents"
                    value={creditData.dependents}
                    onChange={handleChange}
                    error={errors.dependents}
                  />
                </Box>
                <Box sx={{ flex: 0.2 }}>
                  <SelectFieldLabelled
                    label="Наличие недвижимости"
                    options={realEstateOptions}
                    name="realEstate"
                    value={creditData.realEstate}
                    onChange={handleChange}
                    error={errors.realEstate}
                  />
                </Box>
                <Box sx={{ flex: 0.2 }}>
                  <SelectFieldLabelled
                    label="Наличие автомобиля"
                    options={carOptions}
                    name="car"
                    value={creditData.car}
                    onChange={handleChange}
                    error={errors.car}
                  />
                </Box>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: '10px' }}>
              <StyledButton
                text={
                  <>
                    Продолжить&nbsp;
                    <ArrowRight />
                  </>
                }
                onClick={handleContinue}
              />
            </Box>
          </Box>
        </form>
      </Box>
      <CreditModal
        open={openConfirmationModal}
        onClose={() => setOpenConfirmationModal(false)}
        userData={userData}
        creditData={creditData}
        handleReqUpd={handleReqUpd}
      />
    </>
  );
}
