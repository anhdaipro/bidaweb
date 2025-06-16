'use client'

import React, { useState } from 'react'
import {
  Container,
  TextField,
  Button,
  Typography,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  CircularProgress,
} from '@mui/material'
import { usecheckInTimeSheet } from '@query/useTimesheet'
import { TYPE_CHECKIN, TYPE_CHECKOUT } from '@form/schedule'
import { useToastStore } from '@store/toastStore'
import { usegetAllShift } from '@query/useShift'
import { RequiredLable } from '../Icon'
import { Shift } from '@type/model/Shift'
import { generateId } from '@utils/format'
export default function CheckInCheckOut() {
  const [shift, setShift] = useState<number>(0)
  const {data:shifts, isLoading} = usegetAllShift();
  const [loading, setLoading] = useState(false)
  const {mutate: checkIn, isPending, isSuccess} = usecheckInTimeSheet();
  const addToast = useToastStore((state) => state.addToast)
  const handleCheck = async (type: number) => {
    if (!shift) {
      addToast({
        id: generateId(),
        message: 'Vui lòng chọn ca làm việc.',
        type: 'error',
      })
      return
    }
    setLoading(true)
    // Lấy vị trí GPS từ trình duyệt
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        try {
          const location = latitude + ',' + longitude
          const payload ={
            type,
            location,
            shiftId: shift,
          }
          checkIn(payload, {
            onSuccess: (data) => {
              setLoading(false)
              addToast({
                id: generateId(),
                message: data.message,
                type: 'success',
              })
            },
            onError: (error:any) => {
              addToast({
                id: generateId(),
                message: error.response.data.message,
                type: 'error',
              })
              setLoading(false)
            },
          });
        } catch (error) {
          addToast({
            id: generateId(),
            message: 'Không lấy được vị trí. Vui lòng cho phép quyền định vị.',
            type: 'error',
          })
          setLoading(false)
        }
      }
    )
  }
  if(isLoading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
        <CircularProgress color="primary" />
        <Typography mt={2}>Đang tải dữ liệu...</Typography>
      </Box>
    )
  }
  return (
    <Container maxWidth="sm" sx={{py: 3 }}>
      <Box display={'flex'} flexDirection={'column'} gap={2}>
      <Typography variant="h2" gutterBottom mb={2}>
        Chấm công tại địa điểm
      </Typography>

      <Stack spacing={3}>
      <FormControl fullWidth>
        <InputLabel >Ca làm việc<RequiredLable required /></InputLabel>
          <Select
            id="shiftId"
            label="Ca làm việc"
            value={shift}
            onChange={(e) => setShift(e.target.value as number)}
          >
            <MenuItem value={0}>Ca làm việc</MenuItem>
            {shifts.map((item:Shift) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name} {item.startTime} - {item.endTime}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            onClick={() => handleCheck(TYPE_CHECKIN)}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Check In'}
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            onClick={() => handleCheck(TYPE_CHECKOUT)}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Check Out'}
          </Button>
        </Stack>
      </Stack>
      </Box>
    </Container>
  )
}
