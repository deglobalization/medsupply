import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
  Box,
  Paper,
  Divider,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  MenuItem
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import LockIcon from '@mui/icons-material/Lock';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PhoneIcon from '@mui/icons-material/Phone';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

const RegisterPage: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  
  // 기본 정보
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  
  // 병원 정보
  const [hospitalName, setHospitalName] = useState('');
  const [hospitalType, setHospitalType] = useState('');
  const [department, setDepartment] = useState('');
  const [position, setPosition] = useState('');
  const [address, setAddress] = useState('');
  
  // 추가 정보
  const [endoscopeCount, setEndoscopeCount] = useState('');
  const [monthlyProcedures, setMonthlyProcedures] = useState('');
  const [currentInventorySystem, setCurrentInventorySystem] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);

  const steps = ['기본 정보', '병원 정보', '추가 정보'];

  const handleNext = () => {
    if (activeStep === 0) {
      if (!email || !password || !confirmPassword || !name || !phone) {
        setError('모든 필수 항목을 입력해주세요.');
        return;
      }
      if (password !== confirmPassword) {
        setError('비밀번호가 일치하지 않습니다.');
        return;
      }
    } else if (activeStep === 1) {
      if (!hospitalName || !hospitalType || !address) {
        setError('모든 필수 항목을 입력해주세요.');
        return;
      }
    }
    
    setError(null);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setError(null);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!agreeToTerms) {
      setError('서비스 이용약관에 동의해주세요.');
      return;
    }
    
    setError(null);
    setIsSubmitting(true);
    
    // 실제 구현에서는 회원가입 API 호출
    setTimeout(() => {
      console.log('회원가입 완료', {
        email, password, name, phone, 
        hospitalName, hospitalType, department, position, address,
        endoscopeCount, monthlyProcedures, currentInventorySystem,
        marketingConsent
      });
      
      // 등록 완료 후 안내 화면 표시
      setActiveStep(steps.length);
      setIsSubmitting(false);
    }, 1500);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const hospitalTypes = [
    '대학병원',
    '종합병원',
    '병원',
    '의원',
    '기타'
  ];

  const departments = [
    '내과',
    '외과',
    '소화기내과',
    '간담췌외과',
    '구매부',
    '관리부',
    '기타'
  ];

  const positions = [
    '의사',
    '간호사',
    '내시경실 기사',
    '구매 담당자',
    '병원 관리자',
    '기타'
  ];

  const endoscopeCounts = [
    '1-5개',
    '6-10개',
    '11-20개',
    '21-50개',
    '50개 이상'
  ];

  const monthlyProceduresOptions = [
    '100건 미만',
    '100-300건',
    '301-500건',
    '501-1000건',
    '1000건 이상'
  ];

  const inventorySystems = [
    '수기 관리',
    '엑셀/스프레드시트',
    '자체 개발 시스템',
    '외부 솔루션 사용',
    '없음'
  ];

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              기본 정보
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="이메일 주소"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="비밀번호"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="비밀번호 보기 설정"
                          onClick={handleTogglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="비밀번호 확인"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="이름"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="연락처"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        );
      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              병원 정보
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="병원/의료기관명"
                  required
                  value={hospitalName}
                  onChange={(e) => setHospitalName(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocalHospitalIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="병원 종류"
                  required
                  value={hospitalType}
                  onChange={(e) => setHospitalType(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BusinessIcon />
                      </InputAdornment>
                    ),
                  }}
                >
                  {hospitalTypes.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="부서"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  {departments.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="직책"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                >
                  {positions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="주소"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Grid>
            </Grid>
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              추가 정보
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="내시경 보유 수량"
                  value={endoscopeCount}
                  onChange={(e) => setEndoscopeCount(e.target.value)}
                >
                  {endoscopeCounts.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="월평균 내시경 시술 건수"
                  value={monthlyProcedures}
                  onChange={(e) => setMonthlyProcedures(e.target.value)}
                >
                  {monthlyProceduresOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="현재 사용 중인 재고 관리 시스템"
                  value={currentInventorySystem}
                  onChange={(e) => setCurrentInventorySystem(e.target.value)}
                >
                  {inventorySystems.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={agreeToTerms}
                      onChange={(e) => setAgreeToTerms(e.target.checked)}
                      required
                      color="primary"
                    />
                  }
                  label={
                    <Typography variant="body2">
                      서비스 이용약관 및 개인정보 처리방침에 동의합니다. (필수)
                    </Typography>
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={marketingConsent}
                      onChange={(e) => setMarketingConsent(e.target.checked)}
                      color="primary"
                    />
                  }
                  label={
                    <Typography variant="body2">
                      마케팅 정보 수신에 동의합니다. (선택)
                    </Typography>
                  }
                />
              </Grid>
            </Grid>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 4,
          marginBottom: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
            <MedicalServicesIcon color="primary" fontSize="large" sx={{ mr: 1 }} />
            <Typography component="h1" variant="h5" align="center">
              MedSupply Optimizer
            </Typography>
          </Box>
          
          {activeStep === steps.length ? (
            // 등록 완료 화면
            <Box sx={{ textAlign: 'center', py: 3 }}>
              <Typography variant="h5" gutterBottom>
                회원가입이 완료되었습니다!
              </Typography>
              <Typography variant="body1" paragraph>
                MedSupply Optimizer에 가입해 주셔서 감사합니다.
                이메일로 인증 링크가 발송되었습니다. 인증 후 서비스를 이용하실 수 있습니다.
              </Typography>
              <Button 
                variant="contained" 
                component={RouterLink} 
                to="/login"
                sx={{ mt: 3 }}
              >
                로그인하러 가기
              </Button>
            </Box>
          ) : (
            <Box>
              <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              
              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}
              
              <form onSubmit={handleSubmit}>
                {getStepContent(activeStep)}
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                  >
                    이전
                  </Button>
                  <Box>
                    {activeStep === steps.length - 1 ? (
                      <Button
                        variant="contained"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? <CircularProgress size={24} /> : '회원가입 완료'}
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        onClick={handleNext}
                      >
                        다음
                      </Button>
                    )}
                  </Box>
                </Box>
              </form>
            </Box>
          )}
          
          {activeStep !== steps.length && (
            <Box sx={{ mt: 3 }}>
              <Divider sx={{ my: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  또는
                </Typography>
              </Divider>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2">
                  이미 계정이 있으신가요?{' '}
                  <Link component={RouterLink} to="/login" variant="body2">
                    로그인
                  </Link>
                </Typography>
              </Box>
            </Box>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default RegisterPage; 