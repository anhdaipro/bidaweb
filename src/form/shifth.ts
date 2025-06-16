export const STATUS_ACTIVE = 1
export const STATUS_INACTIVE = 2
export const STATUS_LABEL: Record<number, string> = {
[STATUS_ACTIVE]: 'Hoạt động',
[STATUS_INACTIVE]: 'Không hoạt động',
}
const MORNING= 1
   const AFTERNOON= 2
    const NIGHT= 3
    const ADMINISTRATIVE = 4
export const SHIFT_LABELS: Record<number, string> = {
    [MORNING]: 'Ca sáng 08:00 - 12:00',
    [AFTERNOON]: 'Ca chiều 13:00 - 17:00',
    [NIGHT]: 'Ca tối 18:00 - 22:00',
    [ADMINISTRATIVE]: 'Ca hành chính 08:00 - 17:00',
};
export const SHIFT_RANDOM =  [
   MORNING,
AFTERNOON,
    NIGHT,
]