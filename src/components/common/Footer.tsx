import React from 'react';
import { Box, Container, Grid, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.primary.main,
        color: 'white',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              MedSupply Optimizer
            </Typography>
            <Typography variant="body2">
              의료기기 공급망 최적화 서비스
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              주요 링크
            </Typography>
            <Link component={RouterLink} to="/" color="inherit" display="block" sx={{ mb: 1 }}>
              홈
            </Link>
            <Link component={RouterLink} to="/dashboard" color="inherit" display="block" sx={{ mb: 1 }}>
              대시보드
            </Link>
            <Link component={RouterLink} to="/suppliers" color="inherit" display="block" sx={{ mb: 1 }}>
              공급업체 목록
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              문의하기
            </Typography>
            <Typography variant="body2" paragraph>
              이메일: info@medsupply.com
            </Typography>
            <Typography variant="body2">
              전화: 02-123-4567
            </Typography>
          </Grid>
        </Grid>
        <Box mt={3}>
          <Typography variant="body2" align="center">
            {'Copyright © '}
            <Link component={RouterLink} to="/" color="inherit">
              MedSupply Optimizer
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 