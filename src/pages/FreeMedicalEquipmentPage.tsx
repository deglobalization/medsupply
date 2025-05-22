import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';

// 의원 및 무료 나눔 의료기기 데이터 (실제로는 API에서 데이터를 가져옴)
const clinicData = [
  {
    id: 1,
    name: '하남연세내과의원',
    address: '경기도 하남시 신장동 520-5',
    phone: '031-795-7722',
    position: { lat: 37.5405, lng: 127.2147 },
    equipments: [
      { id: 1, name: '내시경 부품', condition: '상', quantity: 3, description: '거의 새것에 가까운 상태입니다.' },
      { id: 2, name: '산소포화도 측정기', condition: '중', quantity: 2, description: '사용감 있으나 정상 작동합니다.' }
    ]
  },
  {
    id: 2,
    name: '웰빙내과의원',
    address: '경기도 하남시 덕풍동 730-1',
    phone: '031-793-8275',
    position: { lat: 37.5308, lng: 127.2042 },
    equipments: [
      { id: 3, name: '혈압계', condition: '상', quantity: 5, description: '정확도 높은 디지털 혈압계입니다.' },
      { id: 4, name: '청진기', condition: '중', quantity: 2, description: '의대생들에게 적합합니다.' }
    ]
  },
  {
    id: 3,
    name: '미사서울내과',
    address: '경기도 하남시 신장동 452-2',
    phone: '031-792-8253',
    position: { lat: 37.5467, lng: 127.2063 },
    equipments: [
      { id: 5, name: '내시경 세척기 부품', condition: '상', quantity: 1, description: '6개월 사용, 상태 양호합니다.' },
      { id: 6, name: '생리식염수 스탠드', condition: '상', quantity: 3, description: '거의 새것입니다.' }
    ]
  },
  {
    id: 4,
    name: '덕풍굿모닝내과',
    address: '경기도 하남시 덕풍동 762-5',
    phone: '031-794-6633',
    position: { lat: 37.5387, lng: 127.2114 },
    equipments: [
      { id: 7, name: '주사기 세트', condition: '상', quantity: 10, description: '멸균 패키지 상태 그대로입니다.' },
      { id: 8, name: '소독기', condition: '중', quantity: 1, description: '1년 사용했으나 정상 작동합니다.' }
    ]
  },
  {
    id: 5,
    name: '신장탑내과의원',
    address: '경기도 하남시 신장동 566-2',
    phone: '031-793-7528',
    position: { lat: 37.5392, lng: 127.2219 },
    equipments: [
      { id: 9, name: '혈당측정기', condition: '상', quantity: 4, description: '신형 디지털 기기입니다.' },
      { id: 10, name: '인공호흡기 부품', condition: '중', quantity: 2, description: '호환성 높은 부품입니다.' }
    ]
  }
];

const FreeMedicalEquipmentPage: React.FC = () => {
  const [selectedClinic, setSelectedClinic] = useState<number | null>(null);
  const [equipmentType, setEquipmentType] = useState<string>('전체');
  const [condition, setCondition] = useState<string>('전체');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedEquipment, setSelectedEquipment] = useState<any>(null);
  
  const equipmentTypes = ['전체', '내시경 부품', '혈압계', '청진기', '소독기', '주사기 세트', '혈당측정기', '기타'];
  const conditions = ['전체', '상', '중', '하'];
  
  const handleMarkerClick = (clinicId: number) => {
    setSelectedClinic(clinicId);
  };
  
  const handleEquipmentClick = (equipment: any) => {
    setSelectedEquipment(equipment);
    setOpenDialog(true);
  };
  
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  
  const handleContactClick = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };
  
  // 필터링된 의원 목록
  const filteredClinics = clinicData.filter(clinic => {
    // 의원 이름이나 주소로 검색
    const matchesSearchTerm = 
      searchTerm === '' || 
      clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      clinic.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    // 선택된 장비 유형이나 상태가 있는 경우
    const hasMatchingEquipment = clinic.equipments.some(equipment => {
      const matchesType = equipmentType === '전체' || equipment.name.includes(equipmentType);
      const matchesCondition = condition === '전체' || equipment.condition === condition;
      return matchesType && matchesCondition;
    });
    
    return matchesSearchTerm && hasMatchingEquipment;
  });

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Typography variant="h4" gutterBottom>
        무료 의료기기 나눔 지도
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        하남시 지역 의원에서 제공하는 무료 의료기기를 확인하고 신청하세요.
      </Typography>
      
      {/* 검색 및 필터 */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="의원명 또는 주소 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={6} md={4}>
            <FormControl fullWidth>
              <InputLabel>장비 유형</InputLabel>
              <Select
                value={equipmentType}
                onChange={(e) => setEquipmentType(e.target.value as string)}
                label="장비 유형"
                startAdornment={
                  <InputAdornment position="start">
                    <MedicalServicesIcon fontSize="small" />
                  </InputAdornment>
                }
              >
                {equipmentTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={4}>
            <FormControl fullWidth>
              <InputLabel>상태</InputLabel>
              <Select
                value={condition}
                onChange={(e) => setCondition(e.target.value as string)}
                label="상태"
                startAdornment={
                  <InputAdornment position="start">
                    <FilterListIcon fontSize="small" />
                  </InputAdornment>
                }
              >
                {conditions.map((cond) => (
                  <MenuItem key={cond} value={cond}>
                    {cond}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
      
      {/* 지도 및 의원 목록 */}
      <Grid container spacing={3}>
        {/* 지도 */}
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 1, height: '500px', position: 'relative' }}>
            <Map
              center={{ lat: 37.5382, lng: 127.2095 }}
              style={{ width: '100%', height: '100%' }}
              level={5}
            >
              {filteredClinics.map((clinic) => (
                <React.Fragment key={clinic.id}>
                  <MapMarker
                    position={clinic.position}
                    onClick={() => handleMarkerClick(clinic.id)}
                    clickable={true}
                  />
                  {selectedClinic === clinic.id && (
                    <CustomOverlayMap
                      position={clinic.position}
                      yAnchor={1.5}
                    >
                      <Box sx={{ 
                        bgcolor: 'background.paper', 
                        p: 1, 
                        borderRadius: 1, 
                        boxShadow: 3,
                        minWidth: '150px',
                        maxWidth: '250px',
                      }}>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {clinic.name}
                        </Typography>
                        <Typography variant="body2">
                          무료 의료기기: {clinic.equipments.length}개
                        </Typography>
                      </Box>
                    </CustomOverlayMap>
                  )}
                </React.Fragment>
              ))}
            </Map>
          </Paper>
        </Grid>
        
        {/* 의원 및 장비 목록 */}
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 2, maxHeight: '500px', overflow: 'auto' }}>
            <Typography variant="h6" gutterBottom>
              의원 목록 ({filteredClinics.length})
            </Typography>
            {filteredClinics.length === 0 ? (
              <Typography variant="body1">검색 결과가 없습니다.</Typography>
            ) : (
              filteredClinics.map((clinic) => (
                <Card key={clinic.id} sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {clinic.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <LocationOnIcon color="action" fontSize="small" sx={{ mr: 0.5 }} />
                      <Typography variant="body2" color="text.secondary">
                        {clinic.address}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <PhoneIcon color="action" fontSize="small" sx={{ mr: 0.5 }} />
                      <Typography variant="body2" color="text.secondary">
                        {clinic.phone}
                      </Typography>
                    </Box>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="subtitle2" gutterBottom>
                      무료 제공 의료기기:
                    </Typography>
                    <List dense>
                      {clinic.equipments.map((equipment) => {
                        // 필터 조건에 맞는 기기만 표시
                        const matchesType = equipmentType === '전체' || equipment.name.includes(equipmentType);
                        const matchesCondition = condition === '전체' || equipment.condition === condition;
                        
                        if (matchesType && matchesCondition) {
                          return (
                            <ListItem 
                              key={equipment.id} 
                              button 
                              onClick={() => handleEquipmentClick(equipment)}
                            >
                              <ListItemText 
                                primary={equipment.name} 
                                secondary={`상태: ${equipment.condition} / 수량: ${equipment.quantity}개`}
                              />
                              <Chip 
                                label="상세보기" 
                                color="primary" 
                                size="small" 
                                clickable
                              />
                            </ListItem>
                          );
                        }
                        return null;
                      })}
                    </List>
                  </CardContent>
                  <CardActions>
                    <Button 
                      size="small" 
                      color="primary"
                      onClick={() => handleMarkerClick(clinic.id)}
                    >
                      지도에서 보기
                    </Button>
                    <Button 
                      size="small" 
                      color="primary"
                      onClick={() => handleContactClick(clinic.phone)}
                    >
                      전화하기
                    </Button>
                  </CardActions>
                </Card>
              ))
            )}
          </Paper>
        </Grid>
      </Grid>
      
      {/* 장비 상세 정보 다이얼로그 */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        {selectedEquipment && (
          <>
            <DialogTitle>
              장비 상세 정보
            </DialogTitle>
            <DialogContent dividers>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                  <MedicalServicesIcon />
                </Avatar>
                <Typography variant="h6">
                  {selectedEquipment.name}
                </Typography>
              </Box>
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    상태
                  </Typography>
                  <Typography variant="body1">
                    {selectedEquipment.condition}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    수량
                  </Typography>
                  <Typography variant="body1">
                    {selectedEquipment.quantity}개
                  </Typography>
                </Grid>
              </Grid>
              <Typography variant="body2" color="text.secondary">
                설명
              </Typography>
              <Typography variant="body1" paragraph>
                {selectedEquipment.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                신청 방법
              </Typography>
              <Typography variant="body1">
                해당 의원에 직접 연락하여 신청해 주세요. 재고 현황에 따라 선착순으로 제공됩니다.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>
                닫기
              </Button>
              <Button 
                variant="contained" 
                color="primary"
                onClick={() => {
                  const clinic = clinicData.find(c => 
                    c.equipments.some(e => e.id === selectedEquipment.id)
                  );
                  if (clinic) {
                    handleContactClick(clinic.phone);
                  }
                }}
              >
                연락하기
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default FreeMedicalEquipmentPage; 