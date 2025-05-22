import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  TextField,
  InputAdornment,
  Rating,
  Chip,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Tab,
  Tabs
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import BusinessIcon from '@mui/icons-material/Business';
import StarIcon from '@mui/icons-material/Star';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaidIcon from '@mui/icons-material/Paid';

const SupplierDirectoryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('전체');
  const [tabValue, setTabValue] = useState(0);

  // 공급업체 데이터 (실제로는 API에서 가져옴)
  const suppliers = [
    {
      id: 1,
      name: '메디칼 서플라이',
      logo: 'https://via.placeholder.com/150?text=MS',
      category: '내시경 소모품',
      rating: 4.5,
      reviewCount: 87,
      description: '다양한 내시경 소모품 및 부품을 제공하는 전문 공급업체입니다. 고품질 제품과 신속한 배송을 자랑합니다.',
      responseTime: '24시간 이내',
      deliveryTime: '2-3일',
      location: '서울시 강남구',
      tags: ['빠른 배송', '대량 할인', '품질 보증'],
      contact: {
        phone: '02-123-4567',
        email: 'info@medicalsupply.co.kr'
      },
      products: [
        { name: '내시경 세척액', price: '120,000원', inStock: true },
        { name: '생검 겸자', price: '85,000원', inStock: true },
        { name: '밸브 세트', price: '45,000원', inStock: false }
      ]
    },
    {
      id: 2,
      name: '의료기기 코리아',
      logo: 'https://via.placeholder.com/150?text=MK',
      category: '내시경 장비',
      rating: 4.2,
      reviewCount: 63,
      description: '다양한 내시경 장비와 부속품을 전문으로 취급하며, 기술 지원 및 유지 보수 서비스를 제공합니다.',
      responseTime: '48시간 이내',
      deliveryTime: '3-5일',
      location: '서울시 서초구',
      tags: ['기술 지원', '유지 보수', '교육 제공'],
      contact: {
        phone: '02-345-6789',
        email: 'service@medicalkorea.co.kr'
      },
      products: [
        { name: '비디오 내시경 시스템', price: '15,000,000원', inStock: true },
        { name: '광원 장치', price: '3,800,000원', inStock: true },
        { name: '모니터 트롤리', price: '2,500,000원', inStock: true }
      ]
    },
    {
      id: 3,
      name: '엔도 솔루션',
      logo: 'https://via.placeholder.com/150?text=ES',
      category: '소독 및 세척 장비',
      rating: 4.8,
      reviewCount: 102,
      description: '내시경 소독 및 세척 장비 전문 기업으로, 병원급 소독 시스템 및 솔루션을 제공합니다.',
      responseTime: '12시간 이내',
      deliveryTime: '1-2일',
      location: '경기도 성남시',
      tags: ['프리미엄 품질', '신속 배송', 'AS 보장'],
      contact: {
        phone: '031-789-0123',
        email: 'contact@endosolution.co.kr'
      },
      products: [
        { name: '자동 내시경 세척기', price: '25,000,000원', inStock: true },
        { name: '초음파 세척기', price: '8,500,000원', inStock: true },
        { name: '건조 캐비닛', price: '6,200,000원', inStock: false }
      ]
    },
    {
      id: 4,
      name: '메디칼 테크',
      logo: 'https://via.placeholder.com/150?text=MT',
      category: '내시경 소모품',
      rating: 4.0,
      reviewCount: 45,
      description: '합리적인 가격의 내시경 소모품을 제공하며, 중소 병원 및 클리닉을 위한 맞춤형 서비스를 제공합니다.',
      responseTime: '36시간 이내',
      deliveryTime: '2-4일',
      location: '부산시 해운대구',
      tags: ['합리적 가격', '정기 배송', '소량 주문 가능'],
      contact: {
        phone: '051-456-7890',
        email: 'sales@medicaltech.co.kr'
      },
      products: [
        { name: '일회용 생검 겸자', price: '65,000원', inStock: true },
        { name: '물통 세트', price: '28,000원', inStock: true },
        { name: '흡인 튜브', price: '15,000원', inStock: true }
      ]
    }
  ];

  const filteredSuppliers = suppliers
    .filter(supplier => 
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      supplier.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(supplier => 
      categoryFilter === '전체' || supplier.category === categoryFilter
    );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event: any) => {
    setCategoryFilter(event.target.value);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const categories = ['전체', '내시경 소모품', '내시경 장비', '소독 및 세척 장비'];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Typography variant="h4" gutterBottom>
        공급업체 디렉토리
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        내시경 소모품 및 장비를 제공하는 검증된 공급업체를 찾아보세요.
      </Typography>

      {/* 검색 및 필터 */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="공급업체 또는 제품 검색..."
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>카테고리 필터</InputLabel>
              <Select
                value={categoryFilter}
                onChange={handleCategoryChange}
                label="카테고리 필터"
                startAdornment={
                  <InputAdornment position="start">
                    <FilterListIcon />
                  </InputAdornment>
                }
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {/* 결과 개요 */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="body1">
          {filteredSuppliers.length}개의 공급업체를 찾았습니다
        </Typography>
      </Box>

      {/* 공급업체 목록 */}
      <Grid container spacing={3}>
        {filteredSuppliers.map((supplier) => (
          <Grid item key={supplier.id} xs={12}>
            <Card>
              <CardContent>
                <Grid container spacing={3}>
                  {/* 로고 및 기본 정보 */}
                  <Grid item xs={12} sm={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Avatar 
                      src={supplier.logo} 
                      alt={supplier.name}
                      sx={{ width: 100, height: 100, mb: 2 }}
                    />
                    <Typography variant="h6" align="center">
                      {supplier.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Rating 
                        value={supplier.rating} 
                        precision={0.1} 
                        readOnly 
                        size="small"
                      />
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        ({supplier.reviewCount} 리뷰)
                      </Typography>
                    </Box>
                    <Chip 
                      label={supplier.category} 
                      color="primary" 
                      size="small" 
                      sx={{ mt: 1 }}
                    />
                  </Grid>
                  
                  {/* 세부 정보 */}
                  <Grid item xs={12} sm={9}>
                    <Box sx={{ mb: 2 }}>
                      <Tabs 
                        value={tabValue} 
                        onChange={handleTabChange}
                        variant="fullWidth"
                      >
                        <Tab label="업체 정보" />
                        <Tab label="제품" />
                        <Tab label="연락처" />
                      </Tabs>
                    </Box>
                    
                    {tabValue === 0 && (
                      <Box>
                        <Typography variant="body1" paragraph>
                          {supplier.description}
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={4}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <BusinessIcon color="action" sx={{ mr: 1 }} />
                              <Typography variant="body2">
                                위치: {supplier.location}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <PaidIcon color="action" sx={{ mr: 1 }} />
                              <Typography variant="body2">
                                응답 시간: {supplier.responseTime}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <LocalShippingIcon color="action" sx={{ mr: 1 }} />
                              <Typography variant="body2">
                                배송 시간: {supplier.deliveryTime}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                        <Box sx={{ mt: 2 }}>
                          {supplier.tags.map((tag) => (
                            <Chip 
                              key={tag} 
                              label={tag} 
                              size="small" 
                              sx={{ mr: 1, mb: 1 }} 
                              variant="outlined"
                            />
                          ))}
                        </Box>
                      </Box>
                    )}
                    
                    {tabValue === 1 && (
                      <List>
                        {supplier.products.map((product, index) => (
                          <ListItem key={index} alignItems="flex-start" divider={index < supplier.products.length - 1}>
                            <ListItemText
                              primary={product.name}
                              secondary={
                                <React.Fragment>
                                  <Typography component="span" variant="body2" color="textPrimary">
                                    {product.price}
                                  </Typography>
                                  <Chip 
                                    label={product.inStock ? '재고 있음' : '재고 없음'} 
                                    color={product.inStock ? 'success' : 'error'} 
                                    size="small" 
                                    sx={{ ml: 1 }}
                                  />
                                </React.Fragment>
                              }
                            />
                            <Button variant="outlined" size="small">
                              주문 문의
                            </Button>
                          </ListItem>
                        ))}
                      </List>
                    )}
                    
                    {tabValue === 2 && (
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="body1" gutterBottom>
                          {supplier.name}에 연락하기
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                              <PhoneIcon color="primary" sx={{ mr: 1 }} />
                              <Typography variant="body1">
                                {supplier.contact.phone}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                              <EmailIcon color="primary" sx={{ mr: 1 }} />
                              <Typography variant="body1">
                                {supplier.contact.email}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                          연락하기
                        </Button>
                      </Box>
                    )}
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  자세히 보기
                </Button>
                <Button size="small" color="primary">
                  비교 목록에 추가
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SupplierDirectoryPage; 