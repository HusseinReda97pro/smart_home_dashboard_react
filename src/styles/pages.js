import styled from "styled-components";

export const HomePage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  h1 {
    font-size: 50px;
    font-weight: 900;
  }
`;

export const CreateCoursePage = styled.div`
  padding: 20px 0;
`;
export const CreateUnversityPage = styled(CreateCoursePage)``;
export const CreateFacultyPage = styled(CreateCoursePage)``;
export const CourseDetails = styled(CreateCoursePage)``;
export const HistoryPage = styled(CreateCoursePage)``;
export const UserPage = styled(CreateCoursePage)``;
export const TeacherPage = styled(CreateCoursePage)``;
export const CourseStudentsPage = styled(CreateCoursePage)``;
export const CreateTypePage = styled(CreateCoursePage)``;

export const SingleHistory = styled.div`
  overflow-x: auto;
  max-height: 300px;
  width: 100%;
  ::-webkit-scrollbar {
    height: 8px;
    width: 8px;
    border-radius: 8px;
    background-color: #ddd;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #666;
    border-radius: 8px;
  }
  table {
    width: 100%;
    border: 2px solid rgba(0 0 0 / 3%);
    border-radius: var(--br);
  }
  tr {
    th {
      &:first-child {
        padding-left: 10px;
      }
      padding: 10px 0;
      font-weight: normal;
      color: #000;
      background: #f3f3f3;
      min-width: 100px;
    }
  }

  tr:hover {
    background: #f3f3f3;
    cursor: pointer;
  }
  tr.selected {
    // light blue
    background: #e1f5fe;
  }

  tbody {
    td {
      &:first-child {
        padding-left: 1rem;
      }
      background-color: rgba(0 0 0 / 2%);
      padding: 1rem 2rem 1rem 0;
    }
  }
`;
