require 'test_helper'

class ToysControllerTest < ActionDispatch::IntegrationTest
  setup do
    @toy = toys(:one)
  end

  test "should get index" do
    get toys_url, as: :json
    assert_response :success
  end

  test "should create toy" do
    assert_difference('Toy.count') do
      post toys_url, params: { toy: { image: @toy.image, likes: @toy.likes, name: @toy.name } }, as: :json
    end

    assert_response 201
  end

  test "should show toy" do
    get toy_url(@toy), as: :json
    assert_response :success
  end

  test "should update toy" do
    patch toy_url(@toy), params: { toy: { image: @toy.image, likes: @toy.likes, name: @toy.name } }, as: :json
    assert_response 200
  end

  test "should destroy toy" do
    assert_difference('Toy.count', -1) do
      delete toy_url(@toy), as: :json
    end

    assert_response 204
  end
end
