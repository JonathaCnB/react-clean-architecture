import { HttpPostClientSpy } from '../../test/mock-http-client'
import { RemoteAuthentication } from './remote-authentications'
import { mockAuthentication } from '../../../domain/test/mock-authentication'
import faker from 'faker'

type SutTypes = {
    sut: RemoteAuthentication
    httpPostClientSpy: HttpPostClientSpy
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
    const httpPostClientSpy = new HttpPostClientSpy()
    const sut = new RemoteAuthentication(url, httpPostClientSpy)
    return {
        sut,
        httpPostClientSpy
    }
}

describe('RemoteAuthentication', () => {
    test('Should call httpPostClient with correct URL', async () => {        
        const url = faker.internet.url()
        const { sut, httpPostClientSpy } = makeSut(url)
        await sut.auth(mockAuthentication())
        expect(httpPostClientSpy.url).toBe(url)
    })
    
    test('Should call httpPostClient with correct body', async () => {        
        const url = faker.internet.url()
        const { sut, httpPostClientSpy } = makeSut(url)
        const authenticationParams = mockAuthentication()
        await sut.auth(authenticationParams)
        expect(httpPostClientSpy.body).toEqual(authenticationParams)
    })
})
