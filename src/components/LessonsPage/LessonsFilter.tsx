import React from "react"
import { Button } from "primereact/button"
import { Dropdown } from "primereact/dropdown"
import { RadioButton } from "primereact/radiobutton"
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator"

import {
  IReservedLessonsFilterState,
  filterInititalState,
} from "../../pages/ReservedLessonsPage/ReservedLessonsPage"
import styles from "./LessonsPage.module.scss"
import { useAppDispatch } from "../../redux/store"
import { AuthType } from "../../redux/auth/authTypes"
import { LoadingStatusTypes } from "../../redux/appTypes"
import LoadingSpinner from "../ui/LoadingSpinner/LoadingSpinner"
import { GetResevedLessonsResponceType } from "../../api/apiTypes"
import { ReservedLessonType } from "../../redux/reservedLessons/reservedLessonsTypes"
import { getReservedLessons } from "../../redux/reservedLessons/reservedLessonsAsyncActions"
import AutoCompleteLessons, { ISelectItems } from "../ui/AutoCompleteLessons/AutoCompleteLessons"

const sortTypes = [
  { name: "За датою проведення  (від нових до старих)", value: "startAt-desc" },
  { name: "За датою проведення (від старих до нових)", value: "startAt-asc" },
  { name: "За зменшенням ціни", value: "price-desc" },
  { name: "За зростанням ціни", value: "price-asc" },
]

interface ILessonsFilterProps {
  totalLessons: number
  auth: AuthType | null
  allUsersSelect: ISelectItems[]
  allLessonsSelect: ISelectItems[]
  loadingStatus: LoadingStatusTypes
  filter: IReservedLessonsFilterState
  reservedLessons: ReservedLessonType[] | null
  setTotalLessons: React.Dispatch<React.SetStateAction<number>>
  setFilter: React.Dispatch<React.SetStateAction<IReservedLessonsFilterState>>
}

const LessonsFilter: React.FC<ILessonsFilterProps> = ({
  auth,
  filter,
  setFilter,
  totalLessons,
  loadingStatus,
  allUsersSelect,
  setTotalLessons,
  reservedLessons,
  allLessonsSelect,
}) => {
  const dispatch = useAppDispatch()

  const onPageChange = (e: PaginatorPageChangeEvent) => {
    setFilter((prev) => ({ ...prev, currentPage: e.page + 1 }))
  }

  const findLessons = async () => {
    if (!auth) return

    const { student, tutor, ...rest } = filter

    if (student.value > 0) {
      const { payload } = await dispatch(getReservedLessons({ ...rest, student: student.value }))
      setTotalLessons((payload as GetResevedLessonsResponceType).totalCount)
    } else if (tutor.value > 0) {
      const { payload } = await dispatch(getReservedLessons({ ...rest, tutor: tutor.value }))
      setTotalLessons((payload as GetResevedLessonsResponceType).totalCount)
    } else {
      const { payload } = await dispatch(getReservedLessons({ ...rest, [auth.userRole]: auth.id }))
      setTotalLessons((payload as GetResevedLessonsResponceType).totalCount)
    }
  }

  React.useEffect(() => {
    if (reservedLessons && reservedLessons.length) return
    findLessons()
  }, [filter.currentPage])

  return (
    <div className={styles.filter}>
      {!auth ? (
        <LoadingSpinner />
      ) : (
        <>
          <h2 className={styles["filter-title"]}>Мої уроки</h2>

          <div className={styles["filter-item"]}>
            <b>Дисципліна:</b>
            <AutoCompleteLessons
              name="name"
              selectList={allLessonsSelect}
              value={String(filter.name || "")}
              onChange={(e) => setFilter((prev) => ({ ...prev, name: e.value }))}
              onSelect={(e) => setFilter((prev) => ({ ...prev, name: e.value.label }))}
            />
          </div>

          {/* {auth.userRole === "tutor" ? (
            <div className={styles["filter-item"]}>
              <b>Студенти:</b>
              <AutoCompleteLessons
                name="student"
                selectList={allUsersSelect}
                value={String(filter.student?.label || "")}
                onSelect={(e) => setFilter((prev) => ({ ...prev, student: e.value }))}
                onChange={(e) =>
                  setFilter((prev) => ({ ...prev, student: { ...prev.student, label: e.value } }))
                }
              />
            </div>
          ) : (
            <div className={styles["filter-item"]}>
              <b>Репетитори:</b>
              <AutoCompleteLessons
                name="tutor"
                selectList={allUsersSelect}
                value={String(filter.tutor?.label || "")}
                onSelect={(e) => setFilter((prev) => ({ ...prev, tutor: e.value }))}
                onChange={(e) =>
                  setFilter((prev) => ({ ...prev, tutor: { ...prev.tutor, label: e.value } }))
                }
              />
            </div>
          )} */}

          <div className={styles["radio-group"]}>
            {[
              { label: "Всі", type: "" },
              { label: "Заплановані", type: "planned" },
              { label: "Проведені", type: "conducted" },
            ].map((el) => (
              <div className={styles["radio-button"]} key={el.type}>
                <RadioButton
                  name="status"
                  value={el.type}
                  inputId={el.type}
                  checked={filter.status === el.type}
                  onChange={(e) => setFilter((prev) => ({ ...prev, status: e.value }))}
                />
                <label htmlFor={el.type} className={styles["radio-label"]}>
                  {el.label}
                </label>
              </div>
            ))}
          </div>

          <div className={styles["filter-item"]}>
            <b>Сортувати за:</b>
            <br />
            <Dropdown
              optionLabel="name"
              options={sortTypes}
              value={filter.sortBy}
              style={{ width: "100%" }}
              placeholder="Сортувати за"
              onChange={(e) => setFilter((prev) => ({ ...prev, sortBy: e.value }))}
            />
          </div>

          <Paginator
            // current showed page
            rows={filter.pageSize}
            // total items count
            totalRecords={totalLessons}
            style={{ marginBottom: "20px" }}
            onPageChange={(e) => onPageChange(e)}
            // index of first item in current showed page
            first={filter.currentPage * filter.pageSize - 1}
            template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          />

          <Button
            label="Знайти"
            onClick={findLessons}
            style={{ width: "100%" }}
            disabled={loadingStatus === LoadingStatusTypes.LOADING}
          />
          <Button
            outlined
            label="Очистити фільтр"
            style={{ width: "100%", marginTop: "20px" }}
            onClick={() => setFilter(filterInititalState)}
            disabled={loadingStatus === LoadingStatusTypes.LOADING}
          />
        </>
      )}
    </div>
  )
}

export default LessonsFilter
