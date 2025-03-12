# # from django.shortcuts import render
# from django.http import HttpResponse


# # Create your views here.
# def myIndex(request):
#     my_name = request.GET.get('name', "CGU")
#     return HttpResponse("Hello " + my_name)
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from django.core.serializers.json import DjangoJSONEncoder
import json
import logging

from .models import Post
from .models import Course

logger = logging.getLogger('django')

# class HelloApiView(APIView):
#     def get(self, request):
#         my_name = request.GET.get('name', None)
#         if my_name:
#             retValue = {}
#             retValue['data'] = "Hello" + my_name
#             return Response(retValue, status=status.HTTP_200_OK)
#         else:
#             return Response(
#                 {"res": "parameter: name is None"},
#                 status = status.HTTP_400_BAD_REQUEST
#             )

# @api_view(['GET'])
# def myhello_api(request):
    # my_name = request.GET.get('name', None)
    # if my_name:
    #     return Response({"data":"Hello"+my_name}, status = status.HTTP_200_OK)
    # else:
    #     return Response(
    #         {"res":"parameter: name is None"},
    #         status = status.HTTP_400_BAD_REQUEST
    #     )

# @api_view(['GET'])
# def add_post(request):
#     title = request.GET.get('title', '')
#     content = request.GET.get('content', '')
#     photo = request.GET.get('photo', '')
#     location = request.GET.get('location', '')

#     new_post = Post()
#     new_post.title = title
#     new_post.content = content
#     new_post.photo = photo
#     new_post.location = location
#     new_post.save()

#     logger.debug("**************** myhello_api:" + title)

#     if title:
#         return Response({"data": title + " insert!"}, status=status.HTTP_200_OK)
#     else:
#         return Response(
#             {"res": "parameter: name is None"},
#             status=status.HTTP_400_BAD_REQUEST
#         )


# @api_view(['GET'])
# def list_post(request):
#     posts = Post.objects.all().values()
#     return JsonResponse(list(posts), safe=False)
    
#     return Response({"data": 
#         json.dumps(
#             list(posts),
#             sort_keys=True,
#             indent=1,
#             cls=DjangoJSONEncoder
#         )},
#         status=status.HTTP_200_OK
#     )

@api_view(['POST'])
def addcourse_post(request):
    # 改用 request.data 來取得 JSON POST 資料
    Department = request.data.get('Department', '')
    CourseTitle = request.data.get('CourseTitle', '')
    Instructor = request.data.get('Instructor', '')

    logger.debug(f"**************** myhello_api: {Department}")

    # 確保所有必要欄位都有值
    if not Department or not CourseTitle or not Instructor:
        return Response({'error': 'All fields are required'}, status=status.HTTP_400_BAD_REQUEST)

    # 建立 Course 物件並存入資料庫
    new_course = Course(
        Department=Department,
        CourseTitle=CourseTitle,
        Instructor=Instructor
    )
    new_course.save()  # 儲存到資料庫

    return Response({'message': 'Course added successfully!'}, status=status.HTTP_201_CREATED)

@api_view(['GET'])
def course_post(request):
    course = Course.objects.all().values()
    return JsonResponse(list(course), safe=False)
    
    return Response({"data": 
        json.dumps(
            list(course),
            sort_keys=True,
            indent=1,
            cls=DjangoJSONEncoder
        )},
        status=status.HTTP_200_OK
    )
