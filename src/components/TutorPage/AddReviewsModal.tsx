import React from 'react'
import cn from 'classnames'
import { useSelector } from 'react-redux'
import { Dialog } from 'primereact/dialog'
import { Rating } from 'primereact/rating'
import { Button } from 'primereact/button'
import { Message } from 'primereact/message'
import { useParams } from 'react-router-dom'
import { InputTextarea } from 'primereact/inputtextarea'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { useAppDispatch } from '../../redux/store'
import { authSelector } from '../../redux/auth/authSlice'
import { createReviews } from '../../redux/tutors/tutorsAsyncActions'

interface IReviewsFilds {
  message: string
  rating: number
}

interface IAddReviewsModalProps {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const AddReviewsModal: React.FC<IAddReviewsModalProps> = ({ visible, setVisible }) => {
  const dispatch = useAppDispatch()

  const param = useParams()

  const { auth } = useSelector(authSelector)

  const {
    control,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<IReviewsFilds>({
    mode: 'onBlur',
  })

  const onSubmit: SubmitHandler<IReviewsFilds> = async (data) => {
    if (!auth) return

    try {
      const payload = {
        sender: auth.id,
        recipient: Number(param.id),
        ...data,
      }

      if (!payload.sender || !payload.recipient) {
        return alert('Error')
      }

      dispatch(createReviews(payload))
      setVisible(false)
      setValue('message', '')
      setValue('rating', 0)
    } catch (error) {
      console.error(error)
    }
  }
  console.log(errors)
  return (
    <Dialog header="Залишити відгук" visible={visible} style={{ width: '360px' }} onHide={() => setVisible(false)}>
      <b>Відгук:</b>
      <br />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="message"
          control={control}
          rules={{ required: "Це поле - обов'язкове" }}
          render={({ field }) => {
            return (
              <div>
                <InputTextarea
                  rows={4}
                  autoResize
                  {...field}
                  maxLength={300}
                  style={{ width: '100%' }}
                  className={cn({ 'p-invalid': errors.message })}
                />
                {errors.message && (
                  <Message
                    severity="error"
                    style={{ width: '100%', marginBottom: '20px' }}
                    text={errors.message?.message}
                  />
                )}
              </div>
            )
          }}
        />

        <b style={{ marginTop: '20px', display: 'block' }}>Рейтинг:</b>
        <Controller
          name="rating"
          control={control}
          rules={{ required: "Це поле - обов'язкове" }}
          render={({ field: { value, ...fieldProps } }) => {
            return (
              <div>
                <Rating
                  stars={5}
                  cancel={false}
                  {...fieldProps}
                  value={Number(value)}
                  style={{ width: '100%' }}
                  onChange={(e) => setValue('rating', Number(e.value))}
                  className={cn({ 'p-invalid': errors.rating })}
                />
                {errors.rating && (
                  <Message
                    severity="error"
                    style={{ width: '100%', marginBottom: '20px' }}
                    text={errors.rating?.message}
                  />
                )}
              </div>
            )
          }}
        />

        <Button label="Відправити" type="submit" style={{ marginTop: '20px', width: '100%' }} />
      </form>
    </Dialog>
  )
}

export default AddReviewsModal
