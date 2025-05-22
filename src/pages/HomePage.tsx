import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  CardActions,
  Paper
} from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import BarChartIcon from '@mui/icons-material/BarChart';
import PeopleIcon from '@mui/icons-material/People';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const HomePage: React.FC = () => {
  const features = [
    {
      id: 1,
      icon: <InventoryIcon fontSize="large" color="primary" />,
      title: '재고 최적화',
      description: '내시경 소모품의 적정 재고 수준을 유지하여 과잉 재고를 방지하고 품절 상황을 최소화합니다.',
    },
    {
      id: 2,
      icon: <BarChartIcon fontSize="large" color="primary" />,
      title: '예측 분석',
      description: '고급 알고리즘을 통해 사용량 패턴을 분석하고 미래 수요를 예측합니다.',
    },
    {
      id: 3,
      icon: <PeopleIcon fontSize="large" color="primary" />,
      title: '공급업체 네트워크',
      description: '제품군별 공급업체 정보, 평판, 가격을 비교하고 최적의 파트너를 찾습니다.',
    },
    {
      id: 4,
      icon: <MonetizationOnIcon fontSize="large" color="primary" />,
      title: '비용 절감',
      description: '구매 시기 최적화와 공급업체 평가를 통해 비용을 절감하고 효율성을 높입니다.',
    },
  ];

  const pricingPlans = [
    {
      id: 1,
      title: '기본 플랜',
      price: '월 1만원',
      features: [
        '재고 분석',
        '기본 예측',
        '공급업체 비교',
        '이메일 지원',
      ],
      buttonText: '시작하기',
    },
    {
      id: 2,
      title: '프리미엄 플랜',
      price: '월 5만원',
      features: [
        '고급 예측 분석',
        'API 연동',
        '맞춤형 보고서',
        '우선 지원',
      ],
      buttonText: '무료 체험',
      featured: true,
    },
    {
      id: 3,
      title: '엔터프라이즈 플랜',
      price: '연간 계약',
      features: [
        '다중 지점 의료기관용 통합 솔루션',
        '전담 컨설턴트',
        '맞춤형 구현',
        '24/7 지원',
      ],
      buttonText: '문의하기',
    },
  ];

  return (
    <div>
      {/* 히어로 섹션 */}
      <Paper
        sx={{
          position: 'relative',
          backgroundColor: 'grey.800',
          color: '#fff',
          mb: 6,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: 'url(https://source.unsplash.com/random/?hospital,medical)',
          height: '400px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,.5)',
          }}
        />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography
            component="h1"
            variant="h2"
            color="inherit"
            gutterBottom
            fontWeight="bold"
          >
            의료기기 공급망 최적화 서비스
          </Typography>
          <Typography variant="h5" color="inherit" paragraph>
            내시경 소모품을 포함한 의료기기의 공급망 관리를 혁신하세요
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={RouterLink}
            to="/register"
            sx={{ mt: 3 }}
          >
            무료로 시작하기
          </Button>
        </Container>
      </Paper>

      {/* 특징 섹션 */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography variant="h3" align="center" color="primary" gutterBottom>
          주요 기능
        </Typography>
        <Typography variant="h6" align="center" color="textSecondary" paragraph>
          MedSupply Optimizer가 제공하는 핵심 가치
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {features.map((feature) => (
            <Grid item key={feature.id} xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                  <Typography gutterBottom variant="h5" component="h2">
                    {feature.title}
                  </Typography>
                  <Typography>
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* 무료 의료기기 나눔 섹션 */}
      <Box sx={{ bgcolor: '#e1f5fe', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" gutterBottom color="primary">
                무료 의료기기 나눔
              </Typography>
              <Typography variant="h6" paragraph color="textSecondary">
                주변 의원에서 무료로 나눔하는 의료기기를 찾아보세요
              </Typography>
              <Typography variant="body1" paragraph>
                경기도 하남시 신장동, 덕풍동을 포함한 주변 지역 의원에서
                더 이상 사용하지 않지만 상태가 양호한 의료기기를 무료로 제공합니다.
                내시경 부품, 소독기, 혈압계 등 다양한 장비를 지도에서 쉽게 찾아보세요.
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocationOnIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="body1">
                  지도에서 가까운 의원을 확인하고 직접 연락하세요
                </Typography>
              </Box>
              <Button
                variant="contained"
                size="large"
                component={RouterLink}
                to="/free-equipment"
                sx={{ mt: 2 }}
              >
                무료 나눔 지도 보기
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src={require('../assets/evis-x1.jpg')}
                alt="의료기기 이미지"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* 가격 섹션 */}
      <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" color="primary" gutterBottom>
            요금제
          </Typography>
          <Typography variant="h6" align="center" color="textSecondary" paragraph>
            귀하의 병원에 맞는 최적의 플랜을 선택하세요
          </Typography>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            {pricingPlans.map((plan) => (
              <Grid item key={plan.id} xs={12} sm={6} md={4}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    transform: plan.featured ? 'scale(1.05)' : 'none',
                    border: plan.featured ? '2px solid #1976d2' : 'none',
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                    <Typography gutterBottom variant="h4" component="h2">
                      {plan.title}
                    </Typography>
                    <Typography variant="h5" color="primary" sx={{ my: 2 }}>
                      {plan.price}
                    </Typography>
                    <Box sx={{ my: 3 }}>
                      {plan.features.map((feature, index) => (
                        <Typography key={index} sx={{ py: 1 }}>
                          {feature}
                        </Typography>
                      ))}
                    </Box>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                    <Button 
                      variant={plan.featured ? 'contained' : 'outlined'} 
                      component={RouterLink} 
                      to="/register"
                      size="large"
                    >
                      {plan.buttonText}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* 문의하기 섹션 */}
      <Container maxWidth="md" sx={{ my: 8, textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom color="primary">
          지금 시작하세요
        </Typography>
        <Typography variant="h6" paragraph color="textSecondary">
          MedSupply Optimizer와 함께 의료기기 공급망을 최적화하고 비용을 절감하세요.
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button 
            variant="contained" 
            size="large" 
            component={RouterLink} 
            to="/register"
            sx={{ mx: 1 }}
          >
            무료 체험 시작하기
          </Button>
          <Button 
            variant="outlined" 
            size="large" 
            component={RouterLink} 
            to="/login"
            sx={{ mx: 1 }}
          >
            로그인
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default HomePage; 