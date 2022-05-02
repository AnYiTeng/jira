import ProjectListScreen from 'screens/projectList'
import { useAuth } from 'context/auth-context'
import styled from '@emotion/styled'
import { Row } from 'components/lib'
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg'
import { Dropdown, Menu } from 'antd'

export const Authenticated = () => {
  const { logout, user } = useAuth()

  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <SoftwareLogo width="18rem" color={'rgb(38, 132, 255)'} />
          <Row>项目</Row>
          <Row>用户</Row>
        </HeaderLeft>
        <HeaderRight>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key={'logoout'}>
                  <a onClick={logout}>登出</a>
                </Menu.Item>
              </Menu>
            }
          >
            <a onClick={(e) => e.preventDefault()}>Hi，{user?.name}</a>
          </Dropdown>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  grid-template-areas:
    'header header'
    'main main';
`

const HeaderLeft = styled(Row)`
  display: flex;
  align-items: center;
`

const HeaderRight = styled.div``

const Header = styled(Row)`
  padding: 3.2rem;
  height: 6rem;
  grid-area: header;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`

const Main = styled.main`
  height: calc(100vh - 6rem);
  grid-area: main;
`
