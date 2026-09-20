from rest_framework.renderers import JSONRenderer


class CustomJSONRenderer(JSONRenderer):

    def render(self, data, accepted_media_type=None, renderer_context=None):

        response = renderer_context.get('response')

        if isinstance(data, dict) and all(
            key in data for key in ['success', 'data', 'message']
        ):
            return super().render(
                data,
                accepted_media_type,
                renderer_context
            )

        success = True

        if response is not None and response.status_code >= 400:
            success = False

        wrapped_data = {
            'success': success,
            'data': data,
            'message': 'Request successful' if success else 'Request failed'
        }

        return super().render(
            wrapped_data,
            accepted_media_type,
            renderer_context
        )
