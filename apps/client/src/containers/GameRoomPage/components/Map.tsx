import { Typography } from '../../../components/Typography';
import styled from 'styled-components';

export const Map = () => {
  return (
    <Box>
      <MapImg src="../assets/map.png" alt="none"></MapImg>
      <MapName color="black" size="16" fontWeight="900">
        파이썬
      </MapName>
    </Box>
  );
};

export default Map;

const MapImg = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 15px;
`;
const MapName = styled(Typography)`
  margin-top: 12px;
`;
const Box = styled.div`
  z-index: 99;
  width: 312px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
