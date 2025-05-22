import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableRow,
  Button,
  Divider,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import WarningIcon from '@mui/icons-material/Warning';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import NotificationsIcon from '@mui/icons-material/Notifications';

// 차트 라이브러리 라이브러리 컴포넌트를 가정
// 실제 구현에서는 Chart.js, react-chartjs-2 등을 사용하여 구현
const InventoryChart = () => (
  <Box sx={{ height: 200, bgcolor: '#e3f2fd', p: 2, borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Typography>재고 분석 차트가 여기에 표시됩니다</Typography>
  </Box>
);

const SalesChart = () => (
  <Box sx={{ height: 200, bgcolor: '#e3f2fd', p: 2, borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Typography>매출 분석 차트가 여기에 표시됩니다</Typography>
  </Box>
);

const UsageChart = () => (
  <Box sx={{ height: 200, bgcolor: '#e3f2fd', p: 2, borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Typography>사용량 분석 차트가 여기에 표시됩니다</Typography>
  </Box>
);

const DashboardPage: React.FC = () => {
  // 대시보드 데이터 (실제로는 API에서 가져옴)
  const inventoryAlerts = [
    { id: 1, name: '내시경 세척액', status: '부족', level: '위험', daysLeft: 2 },
    { id: 2, name: '내시경 생검 겸자', status: '부족', level: '주의', daysLeft: 5 },
    { id: 3, name: '내시경 밸브', status: '초과', level: '정보', excess: 20 },
  ];

  const recentOrders = [
    { id: 1, product: '내시경 세척액', supplier: '메디칼 서플라이', date: '2023-05-10', status: '배송 중' },
    { id: 2, product: '내시경 생검 겸자', supplier: '의료기기 코리아', date: '2023-05-08', status: '완료' },
    { id: 3, product: '내시경 밸브', supplier: '엔도 솔루션', date: '2023-05-05', status: '완료' },
    { id: 4, product: '광원 케이블', supplier: '메디칼 테크', date: '2023-05-01', status: '완료' },
  ];

  const supplierRecommendations = [
    { id: 1, name: '메디칼 서플라이', product: '내시경 세척액', price: '120,000원', saving: '15%' },
    { id: 2, name: '의료기기 코리아', product: '내시경 생검 겸자', price: '85,000원', saving: '12%' },
    { id: 3, name: '엔도 솔루션', product: '내시경 밸브', price: '45,000원', saving: '8%' },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        대시보드
      </Typography>
      
      {/* 요약 통계 */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 120 }}>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              총 재고 항목
            </Typography>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
              42
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TrendingUpIcon color="success" sx={{ mr: 1, fontSize: 16 }} />
              <Typography variant="body2" color="success.main">
                지난 달 대비 5% 증가
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 120 }}>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              위험 수준 항목
            </Typography>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
              3
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <WarningIcon color="error" sx={{ mr: 1, fontSize: 16 }} />
              <Typography variant="body2" color="error.main">
                주문 필요
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 120 }}>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              이번 달 주문
            </Typography>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
              15
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TrendingDownIcon color="success" sx={{ mr: 1, fontSize: 16 }} />
              <Typography variant="body2" color="success.main">
                지난 달 대비 8% 감소
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 120 }}>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              절감 비용
            </Typography>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
              ₩1.2M
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TrendingUpIcon color="success" sx={{ mr: 1, fontSize: 16 }} />
              <Typography variant="body2" color="success.main">
                예상 연간 ₩12.5M
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* 차트 */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              재고 분석
            </Typography>
            <InventoryChart />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              알림
            </Typography>
            <List>
              {inventoryAlerts.map((alert) => (
                <ListItem key={alert.id} alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar sx={{ 
                      bgcolor: 
                        alert.level === '위험' ? 'error.main' : 
                        alert.level === '주의' ? 'warning.main' : 'info.main' 
                    }}>
                      <WarningIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={alert.name}
                    secondary={
                      alert.status === '부족' 
                        ? `재고 부족 - ${alert.daysLeft}일 남음`
                        : `재고 초과 - ${alert.excess}% 초과`
                    }
                  />
                  <Chip 
                    label={alert.level} 
                    color={
                      alert.level === '위험' ? 'error' : 
                      alert.level === '주의' ? 'warning' : 'info'
                    }
                    size="small"
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* 추가 차트 */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              사용량 추세
            </Typography>
            <UsageChart />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              비용 분석
            </Typography>
            <SalesChart />
          </Paper>
        </Grid>
      </Grid>

      {/* 최근 주문 및 공급업체 추천 */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              최근 주문
            </Typography>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>제품</TableCell>
                  <TableCell>공급업체</TableCell>
                  <TableCell>날짜</TableCell>
                  <TableCell>상태</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.product}</TableCell>
                    <TableCell>{order.supplier}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>
                      <Chip 
                        label={order.status} 
                        color={order.status === '배송 중' ? 'primary' : 'success'}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button color="primary">모든 주문 보기</Button>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              공급업체 추천
            </Typography>
            <List>
              {supplierRecommendations.map((recommendation) => (
                <ListItem key={recommendation.id} alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar>
                      <MedicalServicesIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={recommendation.name}
                    secondary={
                      <React.Fragment>
                        <Typography component="span" variant="body2" color="textPrimary">
                          {recommendation.product}
                        </Typography>
                        {` - ${recommendation.price} (${recommendation.saving} 절감 가능)`}
                      </React.Fragment>
                    }
                  />
                  <Button variant="outlined" size="small">
                    연락하기
                  </Button>
                </ListItem>
              ))}
            </List>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button color="primary">모든 공급업체 보기</Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardPage; 