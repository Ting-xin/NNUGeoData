import { toolService } from '@/utils/request'

function test(id, token) {
  // toolService.get('/getRemoteDataInfo/d2ada262-cf84-4a7c-a5bc-8d2c89a879ef/2')
  toolService.get('dataApplication/getRemoteDataInfo/' + id + '/' + encodeURIComponent(encodeURIComponent(token)))
}

export {test}
